package com.example.demo.util;

import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.apis.RbacAuthorizationV1Api;
import io.kubernetes.client.openapi.apis.RbacAuthorizationV1Api.APIcreateNamespacedRoleRequest;
import io.kubernetes.client.openapi.auth.ApiKeyAuth;
import io.kubernetes.client.openapi.models.AuthenticationV1TokenRequest;
import io.kubernetes.client.openapi.models.RbacV1Subject;
import io.kubernetes.client.openapi.models.V1ObjectMeta;
import io.kubernetes.client.openapi.models.V1PolicyRule;
import io.kubernetes.client.openapi.models.V1Role;
import io.kubernetes.client.openapi.models.V1RoleBinding;
import io.kubernetes.client.openapi.models.V1RoleRef;
import io.kubernetes.client.openapi.models.V1ServiceAccountSubject;
import io.kubernetes.client.openapi.models.V1UserSubject;
import io.kubernetes.client.util.ClientBuilder;
import io.kubernetes.client.util.KubeConfig;
import jakarta.annotation.PostConstruct;

@Component
public class K8sAdminRbacAuthV1api {

    private ApiClient client;
    private RbacAuthorizationV1Api rbacApi;

    public K8sAdminRbacAuthV1api() {
        try{
            String kubeConfigPath = System.getenv("HOME") + "/.kube/config";
            
            this.client = ClientBuilder.kubeconfig(KubeConfig.loadKubeConfig(new FileReader(kubeConfigPath))).build();
            this.rbacApi = new RbacAuthorizationV1Api(this.client);
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }

    public V1Role createRole(String namespace) {

        V1ObjectMeta metadata = new V1ObjectMeta()
                                    .namespace(namespace)
                                    .name("default-role");

        List<V1PolicyRule> rules = Arrays.asList(
            new V1PolicyRule()
                .apiGroups(Arrays.asList("apps"))
                .resources(Arrays.asList("deployments"))
                .verbs(Arrays.asList("create", "get", "list", "watch", "update", "patch", "delete")),

            new V1PolicyRule()
                .apiGroups(Arrays.asList(""))
                .resources(Arrays.asList("pods", "services"))
                .verbs(Arrays.asList("create", "get", "list", "watch", "update", "patch", "delete")),

            new V1PolicyRule()
                .apiGroups(Arrays.asList(""))
                .resources(Arrays.asList("namespace"))
                .verbs(Arrays.asList("delete")),

            new V1PolicyRule()
                .apiGroups(Arrays.asList("gateway.networking.k8s.io"))
                .resources(Arrays.asList("httproutes"))
                .verbs(Arrays.asList("create", "get", "list", "watch", "update", "patch", "delete"))
        );

        V1Role body = new V1Role()
                        .metadata(metadata)
                        .rules(rules);

        try{
            V1Role result = rbacApi.createNamespacedRole(namespace, body).execute();
            return result;
        }
        catch(ApiException e){
            System.err.println("Exception when calling RbacAuthorizationV1Api#createNamespacedRole");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            System.err.println("Header: " + e);
            e.printStackTrace();
        }
        return null;   
    }

    public V1RoleBinding createRoleBinding(String namespace) {

        V1ObjectMeta metadata = new V1ObjectMeta()
                                    .namespace(namespace)
                                    .name("default-role-binding");

        V1RoleRef roleRef = new V1RoleRef()
                                .kind("Role")
                                .name("default-role");

        List<RbacV1Subject> subjects = Arrays.asList(
            new RbacV1Subject().kind("ServiceAccount").name("default")
        );

        V1RoleBinding body = new V1RoleBinding()
                                .metadata(metadata)
                                .roleRef(roleRef)
                                .subjects(subjects);

        try{
            V1RoleBinding result = rbacApi.createNamespacedRoleBinding(namespace, body).execute();
            return result;
        }
        catch(ApiException e){
            System.err.println("Exception when calling RbacAuthorizationV1Api#createNamespacedRoleBinding");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
        return null;   
    }
}
