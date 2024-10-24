package com.example.demo.dto;

import io.kubernetes.client.openapi.models.V1Deployment;
import io.kubernetes.client.openapi.models.V1Service;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServerStartResponse {
    private V1Deployment v1Deployment;

    private V1Service v1Service;

    public Object object;
}
