package com.example.server.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class sportConfig {
    @Bean
    public Cloudinary getCloudinary(){
        return new Cloudinary("cloudinary://749332554812144:nz5Sg21DZI5JLkT2l9TQa86t5e8@dozs7ggs4");
    }
}
