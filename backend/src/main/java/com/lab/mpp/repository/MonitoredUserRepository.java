package com.lab.mpp.repository;


import com.lab.mpp.domain.MonitoredUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MonitoredUserRepository extends JpaRepository<MonitoredUser, Long> {
    Optional<MonitoredUser> findByUsername(String username);
}
