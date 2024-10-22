package com.example.server.Service;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.server.Service.Impl.CloudinaryImageImpl;

@Service
public class FileUploadService implements CloudinaryImageImpl{
    @Autowired 
     private Cloudinary cloudinary;
     
     @Override
     public Map<String, Object> upload(MultipartFile file){

          try{
               Map<String, Object> data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
               return data;
          }catch(IOException e){
               throw new RuntimeException("Tải ảnh lên Cloudinary thất bại");
          }
     }
}
