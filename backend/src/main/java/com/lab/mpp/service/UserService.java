package com.lab.mpp.service;


import com.lab.mpp.UserController;
import com.lab.mpp.domain.User;
import com.lab.mpp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> login(User user) {
        return userRepository.findByUsernameAndPassword(user.username, user.password);
    }

    public boolean register(User user) {
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
