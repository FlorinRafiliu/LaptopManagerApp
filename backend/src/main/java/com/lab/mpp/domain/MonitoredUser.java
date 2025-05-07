package com.lab.mpp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MonitoredUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer mu_id;

    public String username;

    protected MonitoredUser() { }

    public MonitoredUser(String username) {
        this.username = username;
    }
}
