package com.ReactSpring.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Email;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Data
@Entity
@Getter
@Setter
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate cohortStartDay;
    @NotBlank(message = "khong duoc de trong email")
    @Email(message = "Invalid email format")
    private String email;
    @NotBlank(message = "khong duoc de trong username")
    private String username;
    @JsonIgnore
    @Size(min = 6, max = 20)
    @NotBlank(message = "khong duoc de trong password")
    private String password;
    @OneToMany(fetch = FetchType.EAGER,mappedBy = "user")
    @JsonIgnore
    private List<Authority> authorities = new ArrayList<>();
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
