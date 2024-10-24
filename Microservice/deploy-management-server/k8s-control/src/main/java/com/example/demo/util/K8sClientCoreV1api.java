package com.example.demo.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.AppsV1Api;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.apis.ApiextensionsV1Api;
import io.kubernetes.client.openapi.auth.ApiKeyAuth;
import io.kubernetes.client.openapi.apis.CustomObjectsApi;
import io.kubernetes.client.openapi.models.V1CustomResourceDefinition;
import io.kubernetes.client.openapi.models.V1Deployment;
import io.kubernetes.client.openapi.models.V1Service;
import io.kubernetes.client.openapi.models.V1ServicePort;
import io.kubernetes.client.openapi.models.V1Status;
import io.kubernetes.client.util.Yaml;

import java.nio.file.Files;
import java.nio.file.Path;

@Component
@PropertySource("classpath:templates/test-deployment.yaml")
@PropertySource("classpath:templates/test-service.yaml")
public class K8sClientCoreV1api {
    
    private ApiClient defaultClient;
    private ApiKeyAuth BearerToken; 

    @Value("${CLUSTER_URL}")
    private String CLUSTER_URL;

    
    public K8sClientCoreV1api() {
        
        try{
            String cacertPath = System.getenv("HOME") + "/.kube/k8s-ca.crt";

            this.defaultClient = Configuration.getDefaultApiClient();
            // this.defaultClient.setBasePath(k8sAddress); 
            this.defaultClient.setBasePath("https://" + CLUSTER_URL + ":6443"); 
            this.defaultClient.setSslCaCert(new FileInputStream(cacertPath));

            this.BearerToken = (ApiKeyAuth) this.defaultClient.getAuthentication("BearerToken");
            this.BearerToken.setApiKeyPrefix("Bearer");

            // 
        }
        catch (IOException e){
            e.printStackTrace();
        }
        
    }

    // public V1PodList getPodsInfo(String token, String namespace) {
    //     this.BearerToken.setApiKey(token);
    //     CoreV1Api api = new CoreV1Api(this.defaultClient);

    //     try{
    //         V1PodList result = api.listNamespacedPod(namespace).execute();
    //         return result;
    //     }
    //     catch(ApiException e){
    //         System.err.println("Exception when calling CoreV1Api#listNamespacedPod");
    //         System.err.println("Status code: " + e.getCode());
    //         System.err.println("Reason: " + e.getResponseBody());
    //         e.printStackTrace();

    //         if(e.getCode() == 403){
    //             System.err.println("Used token cannot access to namespace("+namespace+")");
    //             // throw
    //         }
    //     }
    //     return null;
    // }

    public V1Deployment applyDeployment(String token, String namespace, Path fpath) throws IOException, ApiException {
        this.BearerToken.setApiKey(token);
        AppsV1Api api = new AppsV1Api(this.defaultClient);

        try{
            ClassPathResource resource = new ClassPathResource("templates/test-deployment.yaml");
            System.out.println(resource.getPath());
            String data = "";
            // try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(Files.newInputStream(fpath)))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    data += line + "\n";
                }
            } catch (IOException e) {
                e.printStackTrace();

                throw e;
            }
            
            V1Deployment yamlDeployment = (V1Deployment) Yaml.load(data);

            yamlDeployment.getMetadata().setNamespace(namespace);

            V1Deployment result = api.createNamespacedDeployment(namespace, yamlDeployment).execute();

            return result;
        }
        catch(IOException e){
            System.err.println("IOException when reading deployment.yaml");
            e.printStackTrace();

            throw e;
        }
        catch(ApiException e){
            System.err.println("Exception when calling AppsV1Api#createNamespacedDeployment");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();

            throw e;
        }

    }

    public V1Service applyService(String token, String namespace, Path fpath) throws IOException, ApiException {
        this.BearerToken.setApiKey(token);
        CoreV1Api api = new CoreV1Api(this.defaultClient);

        try{
            ClassPathResource resource = new ClassPathResource("templates/test-service.yaml");
            System.out.println(resource.getPath());
            String data = "";
            // try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStrem()))) {
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(Files.newInputStream(fpath)))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    data += line + "\n";
                }
            } catch (IOException e) {
                e.printStackTrace();

                throw e;
            }
            System.out.println(data);

            V1Service yamlService = (V1Service) Yaml.load(data);

            yamlService.getMetadata().setNamespace(namespace);
            
            // V1ServicePort port = new V1ServicePort()
            //                         .protocol("TCP")
            //                         .port(80);
            
            // yamlService.getSpec().setPorts(Arrays.asList(port));

            V1Service result = api.createNamespacedService(namespace, yamlService).execute();
            

            return result;
        }
        catch(IOException e){
            System.err.println("IOException when reading service.yaml");
            e.printStackTrace();

            throw e;
        }
        catch(ApiException e){
            System.err.println("Exception when calling CoreV1Api#createNamespacedService");
            System.err.println("Status code: " + e.getCode());
            System.err.println("Reason: " + e.getResponseBody());
            e.printStackTrace();

            throw e;
        }
    }


    

    public V1Status deleteNamespace(String token, String namespace) throws ApiException{
        this.BearerToken.setApiKey(token);
        CoreV1Api api = new CoreV1Api(this.defaultClient);

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
