package com.example.server.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.Service.FileUploadService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/upload")
@Tag(name = "Cloudinary API", description = "Đăng tải, lưu trữ ảnh")
public class FileController {

    @Autowired
    public FileUploadService uploadFileService;
    
    @PostMapping("/image")
    public ResponseEntity<Map<String, Object>> uploadImage (@RequestParam("image") MultipartFile file){
          Map<String, Object> data = this.uploadFileService.upload(file);
          System.out.println((String) data.get("url"));
          return new ResponseEntity<>(data, HttpStatus.OK);
     }

}
