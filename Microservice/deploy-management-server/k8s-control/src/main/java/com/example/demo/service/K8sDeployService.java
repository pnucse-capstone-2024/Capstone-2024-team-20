package com.example.demo.service;

import com.example.demo.util.K8sClientCoreV1api;
import com.example.demo.util.K8sCustomObjectApi;
import com.example.demo.util.RestClient;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.kubernetes.client.openapi.models.V1Service;
import io.kubernetes.client.openapi.models.V1Status;
import io.kubernetes.client.openapi.models.V1Deployment;

import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class K8sDeployService  {
    private final K8sClientCoreV1api k8sClientCoreApi;
    private final K8sCustomObjectApi k8sCustomObjectApi;
    
    @Autowired
    private final RestClient restClient;

    // public List<PodDto> getPodsInfo(String namespace) {
    //     String id = "testuser_id";
    //     String token = tokenService.findTokenByIdAndName(id, namespace);

    //     V1PodList podInfoList = k8sClientCoreApi.getPodsInfo(token, namespace);

    //     if(podInfoList == null) return new ArrayList<>();


    //     List<PodDto> ret = podInfoList.getItems().stream().map(item -> {
    //         String name = item.getMetadata().getName();
    //         List<V1PodCondition> conditions = item.getStatus().getConditions();
    //         return PodDto.builder()
    //                 .name(name)
    //                 // .name(item.getMetadata().getLabels().get("app"))
    //                 .status(conditions.get(conditions.size() - 1).getType())
    //                 .namespace(namespace)
    //                 .build();
    //     }).collect(Collectors.toList());

    //     return ret;
    // }
    
    public V1Deployment applyDeployment(String token, String namespace, Path path) throws Exception {
        try{
            V1Deployment result = k8sClientCoreApi.applyDeployment(token, namespace, path);

            return result;
        }
        catch(Exception e){
            throw e;
        }
        
    }

    public V1Service applyService(String token, String namespace, Path path) throws Exception {
        try{
            V1Service result = k8sClientCoreApi.applyService(token, namespace, path);

            return result;
        }
        catch(Exception e){
            throw e;
        }

    }

    public Object applyHttpRoute(String token, String namespace, Path path) throws Exception{
        try{
            Object result = k8sCustomObjectApi.applyHttpRoute(token, namespace, path);

            return result;
        }
        catch(Exception e){
            throw e;
        }
        
    }

    public V1Status deleteNamespace(Long uid, String namespace) throws Exception{
        String token;

        try{
            token = restClient.getToken(uid, namespace);
            V1Status result = k8sClientCoreApi.deleteNamespace(token, namespace);

            return result;
        }
        catch(Exception e){
            throw e;
        }
        
    }

    

}

