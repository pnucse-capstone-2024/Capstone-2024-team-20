package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "service")
@IdClass(TokenId.class)
@Getter
@Setter
public class TokenEntity {
    
    @Id
    private String id;

    @Id
    private String name;

    @Column(length = 1024)
    private String token;

}