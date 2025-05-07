package com.lab.mpp.repository;

import com.lab.mpp.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional <User> findByUsernameAndPassword(String username, String password);
}
