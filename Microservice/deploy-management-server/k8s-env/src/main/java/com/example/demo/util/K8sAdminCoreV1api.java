package com.example.demo.util;

import java.io.FileReader;
import java.io.IOException;

import org.springframework.stereotype.Component;


import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.AuthenticationV1TokenRequest;
import io.kubernetes.client.openapi.models.V1Namespace;
import io.kubernetes.client.openapi.models.V1ObjectMeta;
import io.kubernetes.client.openapi.models.V1PodList;
import io.kubernetes.client.openapi.models.V1Status;
import io.kubernetes.client.openapi.models.V1TokenRequestSpec;
import io.kubernetes.client.util.ClientBuilder;
import io.kubernetes.client.util.KubeConfig;


@Component
public class K8sAdminCoreV1api {

    private ApiClient client;
    private CoreV1Api api;

    public K8sAdminCoreV1api() {
        try{
            String kubeConfigPath = System.getenv("HOME") + "/.kube/config";

            this.client = ClientBuilder.kubeconfig(KubeConfig.loadKubeConfig(new FileReader(kubeConfigPath))).build();
            this.api = new CoreV1Api(this.client);
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }


    public V1Namespace createNamespace(String namespace) {

        V1ObjectMeta metadata = new V1ObjectMeta().name(namespace);

        V1Namespace body = new V1Namespace()
                            .metadata(metadata);

        try{
            V1Namespace result = api.createNamespace(body).execute();
            return result;
        }
        catch(ApiException e){
            System.err.println("Exception when calling CoreV1Api#createNamespace");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
        return null;
    }


    public AuthenticationV1TokenRequest createToken(String namespace) {
        // NEED: if token created once, not execute

        V1TokenRequestSpec spec = new V1TokenRequestSpec().expirationSeconds(60*60*24L);

        AuthenticationV1TokenRequest body = new AuthenticationV1TokenRequest()
                            .spec(spec);

        try{
            AuthenticationV1TokenRequest result = api.createNamespacedServiceAccountToken("default", namespace, body).execute();
            return result;
        }
        catch(ApiException e){
            System.err.println("Exception when calling CoreV1Api#createNamespacedServiceAccountToken");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();
        }
        
        return null;
    }

    public V1Status deleteNamespace(String namespace) throws ApiException{

        try{
            V1Status result = api.deleteNamespace(namespace).execute();
            return result;
        }
        catch(ApiException e){
            System.err.println("Exception when calling CoreV1Api#deleteNamespace");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();

            throw e;
        }

    }
    
}
