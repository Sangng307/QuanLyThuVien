package com.ReactSpring.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class AuthCredentialsRequest {

    private String username;
    private String password;

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
