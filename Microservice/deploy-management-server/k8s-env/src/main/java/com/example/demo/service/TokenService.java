package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.TokenEntity;
import com.example.demo.repository.TokenRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public TokenEntity saveTokenEntity(TokenEntity tokenEntity) {
        tokenEntity.setToken(null);
        return tokenRepository.save(tokenEntity);
    }

    public TokenEntity updateToken(String id, String name, String token) {
        Optional<TokenEntity> optionalTokenEntity = tokenRepository.findByIdAndName(id, name);
        if (optionalTokenEntity.isPresent()) {
            TokenEntity tokenEntity = optionalTokenEntity.get();
            tokenEntity.setToken(token);
            return tokenRepository.save(tokenEntity);
        }
        throw new EntityNotFoundException("Token not found for id: " + id + " and name: " + name);
    }

    public String findTokenByIdAndName(String id, String name) {
        Optional<TokenEntity> optionalTokenEntity = tokenRepository.findByIdAndName(id, name);
        if (optionalTokenEntity.isPresent()) {
            TokenEntity tokenEntity = optionalTokenEntity.get();
            return tokenEntity.getToken();
        }
        throw new EntityNotFoundException("Token not found for id: " + id + " and name: " + name);
    }

    public List<String> findNamespacesById(String id) {
        List<String> names = tokenRepository.findNamesById(id);
        return names;
    }

    public void deleteTokenByIdAndName(String id, String name) {
        Optional<TokenEntity> optionalTokenEntity = tokenRepository.findByIdAndName(id, name);
        if (optionalTokenEntity.isPresent()) {
            tokenRepository.deleteByIdAndName(id, name);
        } else {
            throw new EntityNotFoundException("Token not found for id: " + id + " and name: " + name);
        }
    }

    public List<String> findAllNamespaces() {
        List<String> names = tokenRepository.findAllNames();
        return names;
    }
}
