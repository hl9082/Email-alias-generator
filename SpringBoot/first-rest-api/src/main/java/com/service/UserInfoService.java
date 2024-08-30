package com.service;
import com.entity.UserInfo;
import com.repository.UserInfoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;


@Service
public class UserInfoService 
implements UserDetailsService {
@Autowired
private UserInfoRepository repository;

@Autowired
private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       // throw new UnsupportedOperationException("Not supported yet.");
       Optional<UserInfo>userDetail=repository.findByName(username);
       //converting userDetail to userDetails
       return userDetail.map(UserInfoDetails::new)
       .orElseThrow((Supplier<? extends UsernameNotFoundException>) new UsernameNotFoundException("User not found "+username));
    }
    public String addUser(UserInfo userInfo){
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User added successfully!";
    }
}
