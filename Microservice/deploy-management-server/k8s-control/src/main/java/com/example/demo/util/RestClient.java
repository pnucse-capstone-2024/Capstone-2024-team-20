package com.example.demo.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class RestClient {
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${CLUSTER_URL}")
    private String CLUSTER_URL;

    private final String baseUrl = "http://" + CLUSTER_URL + "/deploy/env";

    public String createToken(Long uid, String namespace){
        String url = baseUrl + "/" + "createToken" + "/" + uid + "/" + namespace;

        try{
            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                HttpEntity.EMPTY,
                String.class
            );

            if(response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            throw e;
        }
    }

    public String getToken(Long uid, String namespace){
        String url = baseUrl + "/" + "getToken" + "/" + uid + "/" + namespace;

        try{
            ResponseEntity<String> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                HttpEntity.EMPTY,
                String.class
            );

            if(response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            throw e;
        }
    }

    public Boolean deleteToken(Long uid, String namespace){
        String url = baseUrl + "/" + "deleteToken" + "/" + uid + "/" + namespace;

        try{
            ResponseEntity<Boolean> response = restTemplate.exchange(
                url,
                HttpMethod.DELETE,
                HttpEntity.EMPTY,
                Boolean.class
            );

            if(response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            throw e;
        }
    }
    
    public List<String> getNamesapceList(Long uid){
        String url = baseUrl + "/" + "list" + "/" + uid;

        try{
            ResponseEntity<List<String>> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                HttpEntity.EMPTY,
                new ParameterizedTypeReference<List<String>>() {}
            );

            if(response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
            else{
                return null;
            }
        }
        catch(Exception e){
            throw e;
        }
    }



}
