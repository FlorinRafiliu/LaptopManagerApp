package com.lab.mpp;


import com.lab.mpp.domain.Laptop;
import com.lab.mpp.domain.User;
import com.lab.mpp.repository.UserRepository;
import com.lab.mpp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/users")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        Optional<User> actualUser = userService.login(user);
        if(actualUser.isPresent())
            return new ResponseEntity<>(actualUser.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody User user) {
        if(userService.register(user))
            return new ResponseEntity<>(HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
