package com.example.demo.controller;

import com.example.demo.auth.jwt.TokenProvider;
import com.example.demo.dto.PodDto;
import com.example.demo.dto.ServerStartRequest;
import com.example.demo.dto.ServerStartResponse;
import com.example.demo.service.K8sDeployService;
import com.example.demo.util.K8sCustomObjectApi;
import com.example.demo.util.RestClient;

import io.kubernetes.client.openapi.models.AuthenticationV1TokenRequest;
import io.kubernetes.client.openapi.models.V1Deployment;
import io.kubernetes.client.openapi.models.V1Role;
import io.kubernetes.client.openapi.models.V1RoleBinding;
import io.kubernetes.client.openapi.models.V1Service;
import io.kubernetes.client.openapi.models.V1Status;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/deploy")
public class ApiController {

    private final K8sDeployService k8sDeployService;
    private final RestClient restClient;
    private final TokenProvider tokenProvider;

    @Value("${SAVE_DIR}")
    private String saveDir;


    @GetMapping("/start/{namespace}/{template}")
    public ResponseEntity<?> startServer(@RequestHeader("Authorization") String bearerToken, @PathVariable("namespace") String namespace, @PathVariable("template") String template) {
        String jwt = tokenProvider.resolveToken(bearerToken);
        Long uid = tokenProvider.getMemberIdFromToken(jwt);

        String token = restClient.createToken(uid, namespace);

        Path templateDirPath = Paths.get(saveDir, template);
        if (!Files.isDirectory(templateDirPath)) {
            System.out.println("The " + templateDirPath + " directory does not exist in SAVE_DIR");
            return new ResponseEntity<String>("The " + templateDirPath + " directory does not exist in SAVE_DIR", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        try{
            Files.walk(templateDirPath)
                .filter(Files::isRegularFile)
                .filter(path -> path.toString().endsWith(".yaml"))
                .forEach(path -> {
                    try {
                        String dir_name = path.getParent().getFileName().toString();
                        // System.out.println(dir_name);
                        System.out.println(path.getFileName().toString());

                        if(dir_name.equals("deployment")){
                            V1Deployment resultDeployment = k8sDeployService.applyDeployment(token, namespace, path);
                            // System.out.println(path.getFileName().toString());
                        }
                        else if(dir_name.equals("service")){
                            V1Service resultService = k8sDeployService.applyService(token, namespace, path);
                            // System.out.println(path.getFileName().toString());
                        }
                        else if(dir_name.equals("httproute")){
                            Object resultHttpRoute = k8sDeployService.applyHttpRoute(token, namespace, path);
                            // System.out.println(path.getFileName().toString());
                        }
                        
                    } catch(Exception e) {
                        throw new RuntimeException(e.getMessage());
                    }
                });
            } catch(Exception e) {
                return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
                
            return new ResponseEntity<>(true, HttpStatus.OK);

            

            // ServerStartResponse ret = new ServerStartResponse();
            // ret.setV1Deployment(resultDeployment);
            // ret.setV1Service(resultService);
            // ret.setObject(resultHttpRoute);

            // return new ResponseEntity<ServerStartResponse>(ret, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<?> getListofDeployedNamespace(@RequestHeader("Authorization") String bearerToken){
        String jwt = tokenProvider.resolveToken(bearerToken);
        Long uid = tokenProvider.getMemberIdFromToken(jwt);

        try{
            List<String> result = restClient.getNamesapceList(uid);
            return new ResponseEntity<List<String>>(result, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
            
    }

    // @GetMapping("/detail/{namespace}")
    // public ResponseEntity<List<String>> getDetailofDeployedNamespace(){
    //     return null;
    // }
    

    @DeleteMapping("/stop/{namespace}")
    public ResponseEntity<?> deleteServer(@RequestHeader("Authorization") String bearerToken, @PathVariable("namespace") String namespace) {
        String jwt = tokenProvider.resolveToken(bearerToken);
        Long uid = tokenProvider.getMemberIdFromToken(jwt);

        try{
            // V1Status result = k8sDeployService.deleteNamespace(uid, namespace);
            Boolean result2 = restClient.deleteToken(uid, namespace);
            return new ResponseEntity<Boolean>(result2, HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    
     

    // @GetMapping("/pods/{namespace}")
    // public ResponseEntity<List<PodDto>> getPodsInfo(@PathVariable("namespace") String namespace){
    //     String id = "testuser_id";
    //     List<String> namespaces = tokenService.findNamespacesById(id);
    //     if(!namespaces.contains(namespace)){
    //         return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    //     }

    //     List<PodDto> result = k8sDeployService.getPodsInfo(namespace);

    //     if(result == null){
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    //     return new ResponseEntity<>(result, HttpStatus.OK);
    // }

    


}