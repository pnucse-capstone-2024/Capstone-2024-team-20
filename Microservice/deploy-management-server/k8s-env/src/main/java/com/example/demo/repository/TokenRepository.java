package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.TokenEntity;
import com.example.demo.entity.TokenId;

public interface TokenRepository extends JpaRepository<TokenEntity, TokenId> {
    Optional<TokenEntity> findByIdAndName(String id, String name);

    @Transactional
    void deleteByIdAndName(String id, String name);

    @Query("SELECT t.name FROM TokenEntity t WHERE t.id = :id")
    List<String> findNamesById(@Param("id") String id);

    @Query("SELECT t.name FROM TokenEntity t")
    List<String> findAllNames();

}
