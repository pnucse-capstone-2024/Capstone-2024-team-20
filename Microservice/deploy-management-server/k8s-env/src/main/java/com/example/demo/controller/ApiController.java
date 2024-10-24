package com.example.demo.controller;

import com.example.demo.service.K8sInitService;
import com.example.demo.service.TokenService;

import io.kubernetes.client.openapi.models.V1Status;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/deploy/env")
public class ApiController {

    private final K8sInitService k8sInitService;
    private final TokenService tokenService;

    // fin
    @GetMapping("/createToken/{uid}/{namespace}")
    public ResponseEntity<String> createNamespace(@PathVariable("namespace") String namespace, @PathVariable("uid") String uid){

        List<String> namespaces = tokenService.findNamespacesById(uid);
        if(namespaces.contains(namespace)){
            return new ResponseEntity<>("namespace already exist.", HttpStatus.EXPECTATION_FAILED);
        }
        
        String token = k8sInitService.initNamespace(uid, namespace);
        if(token == null){
            return new ResponseEntity<>("initializing failed.", HttpStatus.EXPECTATION_FAILED);
        }

        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    // fin
    @GetMapping("/getToken/{uid}/{namespace}")
    public ResponseEntity<String> getToken(@PathVariable("namespace") String namespace, @PathVariable("uid") String uid){

        try{
            String token = tokenService.findTokenByIdAndName(uid, namespace);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
    }

    // fin
    @DeleteMapping("/deleteToken/{uid}/{namespace}")
    public ResponseEntity<?> deleteNamespace(@PathVariable("namespace") String namespace, @PathVariable("uid") String uid) {

        try {
            V1Status ret = k8sInitService.deleteNamespace(namespace);
            tokenService.deleteTokenByIdAndName(uid, namespace);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
        }
        
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // fin
    @GetMapping("/list/{uid}")
    public ResponseEntity<List<String>> getPodsInfo(@PathVariable("uid") String uid){

        List<String> ret = tokenService.findNamespacesById(uid);
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }

    @GetMapping("/listAll")
    public ResponseEntity<List<String>> getAllNamespace(){

        List<String> ret = tokenService.findAllNamespaces();
        return new ResponseEntity<>(ret, HttpStatus.OK);
    }


}