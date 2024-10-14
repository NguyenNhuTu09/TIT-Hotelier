package com.example.server.Entity;
import java.time.LocalDateTime;

import com.example.server.Enums.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int ID;
    
    private String firstLastName;
    private String phoneNumber;
    private String userName;
    private String passw;
    private String email;
    private LocalDateTime dateOfBirth;
    private Role userRole;
    
    private LocalDateTime created_At;
    private LocalDateTime updated_At;

    public User(){

    }

    public User(String firstLastName, String phoneNumber, String userName, String passw, String email,
            LocalDateTime dateOfBirth, Role userRole, LocalDateTime created_At, LocalDateTime updated_At) {
        this.firstLastName = firstLastName;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.passw = passw;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.userRole = userRole;
        this.created_At = created_At;
        this.updated_At = updated_At;
    }

    public int getID() {
        return ID;
    }

    public void setID(int iD) {
        ID = iD;
    }

    public String getFirstLastName() {
        return firstLastName;
    }

    public void setFirstLastName(String firstLastName) {
        this.firstLastName = firstLastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassw() {
        return passw;
    }

    public void setPassw(String passw) {
        this.passw = passw;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDateTime dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Role getUserRole() {
        return userRole;
    }

    public void setUserRole(Role userRole) {
        this.userRole = userRole;
    }

    public LocalDateTime getCreated_At() {
        return created_At;
    }

    public void setCreated_At(LocalDateTime created_At) {
        this.created_At = created_At;
    }

    public LocalDateTime getUpdated_At() {
        return updated_At;
    }

    public void setUpdated_At(LocalDateTime updated_At) {
        this.updated_At = updated_At;
    }

    @Override
    public String toString() {
        return "User [ID=" + ID + ", firstLastName=" + firstLastName + ", phoneNumber=" + phoneNumber + ", userName="
                + userName + ", passw=" + passw + ", email=" + email + ", dateOfBirth=" + dateOfBirth + ", userRole="
                + userRole + ", created_At=" + created_At + ", updated_At=" + updated_At + "]";
    }
    
}
