package com.service;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.entity.UserInfo;

public class UserInfoDetails implements UserDetails {

    private final String name;
    private final String password;
    private final List<GrantedAuthority>authorities;

    public UserInfoDetails(UserInfo userInfo){
        name=userInfo.getName();
        password=userInfo.getPassword();
        authorities=Arrays.stream(userInfo.getRoles().split("")).
        map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //throw new UnsupportedOperationException("Not supported yet.");
        return this.authorities;
    }

    @Override
    public String getPassword() {
       // throw new UnsupportedOperationException("Not supported yet.");
       return this.password;
    }

    @Override
    public String getUsername() {
        return this.name;
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
