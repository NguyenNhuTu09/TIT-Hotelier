package com.example.server.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.Entity.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    
}
