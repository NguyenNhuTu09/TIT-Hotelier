package com.example.server.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.server.Entity.User;
import com.example.server.Repository.UserRepository;

@Service
public class UserService {
    
    @Autowired UserRepository userRepository;

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    

}
