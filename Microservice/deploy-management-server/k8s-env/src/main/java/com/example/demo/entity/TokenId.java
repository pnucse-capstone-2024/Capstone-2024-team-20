package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenId implements Serializable {
    private String id;
    private String name;

    public TokenId() {}

    public TokenId(String id, String name) {
        this.id = id;
        this.name = name;
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        TokenId tokenId = (TokenId) obj;
        return id.equals(tokenId.id) && name.equals(tokenId.name);
    }
}