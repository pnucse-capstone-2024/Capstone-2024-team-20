package com.example.demo.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.auth.ApiKeyAuth;
import io.kubernetes.client.openapi.apis.CustomObjectsApi;
import io.kubernetes.client.openapi.apis.CustomObjectsApi.APIcreateNamespacedCustomObjectRequest;

import java.nio.file.Path;
import java.nio.file.Files;

@Component
@PropertySource("classpath:templates/test-httproute.yaml")
public class K8sCustomObjectApi {
    
    private ApiClient defaultClient;
    private ApiKeyAuth BearerToken; 

    @Value("${CLUSTER_URL}")
    private String CLUSTER_URL;

    
    public K8sCustomObjectApi() {
        
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

    // public Object applyHttpRoute(String token, String namespace, String name) throws IOException {
    public Object applyHttpRoute(String token, String namespace, Path fpath) throws IOException, ApiException {
        this.BearerToken.setApiKey(token);
        CustomObjectsApi api = new CustomObjectsApi(this.defaultClient);


        try{
            ClassPathResource resource = new ClassPathResource("templates/test-httproute.yaml");
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
            // System.out.println(data);

            org.yaml.snakeyaml.Yaml yaml = new org.yaml.snakeyaml.Yaml();
            Map<String, Object> httpRoute = yaml.load(data);

            Map<String, Object> metadata = (Map<String, Object>) httpRoute.get("metadata");
            metadata.put("namespace", namespace);

            
            List<Map<String, Object>> rules = (List<Map<String, Object>>) ((Map<String, Object>) httpRoute.get("spec")).get("rules");
            if (rules != null && !rules.isEmpty()) {
                Map<String, Object> firstRule = rules.get(0);
                List<Map<String, Object>> matches = (List<Map<String, Object>>) firstRule.get("matches");

                Map<String, Object> match = matches.get(0);
                Map<String, Object> path = (Map<String, Object>) match.get("path");

                List<Map<String, Object>> filters = (List<Map<String, Object>>) firstRule.get("filters");
                Map<String, Object> filter = filters.get(0);
                Map<String, Object> urlRewrite = (Map<String, Object>) filter.get("urlRewrite");
                Map<String, Object> pathRewrite = (Map<String, Object>) urlRewrite.get("path");

                pathRewrite.put("replacePrefixMatch", path.get("value"));
                path.put("value", "/" + namespace + path.get("value")); 

            }

            
            Object result = api.createNamespacedCustomObject(
                "gateway.networking.k8s.io", // API Group
                "v1",                        // API Version
                namespace,                   // Namespace
                "httproutes",                // Custom Resource Name
                httpRoute                    // 
            ).execute();

            // System.out.println(result);

            return result;
        }
        catch(IOException e){
            System.err.println("IOException when reading service.yaml");
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

    

}
