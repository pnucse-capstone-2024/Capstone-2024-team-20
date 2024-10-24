package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.TokenEntity;
import com.example.demo.util.K8sAdminCoreV1api;
import com.example.demo.util.K8sAdminRbacAuthV1api;

import io.kubernetes.client.openapi.models.AuthenticationV1TokenRequest;
import io.kubernetes.client.openapi.models.V1Namespace;
import io.kubernetes.client.openapi.models.V1Role;
import io.kubernetes.client.openapi.models.V1RoleBinding;
import io.kubernetes.client.openapi.models.V1Status;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class K8sInitService {
    private final K8sAdminCoreV1api k8sAdminCoreApi;
    private final K8sAdminRbacAuthV1api k8sAdminRbacApi;

    @Autowired
    private TokenService tokenService;

    public Boolean createNamespace(String uid, String namespace){
        V1Namespace result = k8sAdminCoreApi.createNamespace(namespace);
        if(result == null) return false;

        TokenEntity newtoken = new TokenEntity();
        newtoken.setId(uid);
        newtoken.setName(namespace);
        tokenService.saveTokenEntity(newtoken);

        return true;
    }

    public String createToken(String uid, String namespace){
        AuthenticationV1TokenRequest result = k8sAdminCoreApi.createToken(namespace);
        if(result == null) return null;

        String token = result.getStatus().getToken();
        tokenService.updateToken(uid, namespace, token);

        return token;
    }

    public Boolean createRole(String namespace){
        V1Role result = k8sAdminRbacApi.createRole(namespace);
        if(result == null) return false;

        return true;
    }

    public Boolean createRoleBinding(String namespace){
        V1RoleBinding result = k8sAdminRbacApi.createRoleBinding(namespace);
        if(result == null) return false;

        return true;
    }

    public String initNamespace(String uid, String name) {
        Boolean success;
        String token;
        
        success = this.createNamespace(uid, name);
        if(success == false){
            return null;
        }

        token = this.createToken(uid, name);
        if(token == null){
            return null;
        }

        success = this.createRole(name);
        if(success == false){
            return null;
        }

        success = this.createRoleBinding(name);
        if(success == false){
            return null;
        }

        return token;
    }

    public V1Status deleteNamespace(String namespace) throws Exception{
        try{
            V1Status result = k8sAdminCoreApi.deleteNamespace(namespace);
            return result;
        }
        catch(Exception e){
            throw e;
        }
    }
    
}
