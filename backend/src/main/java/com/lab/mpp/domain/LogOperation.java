package com.lab.mpp.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
public class LogOperation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer log_id;
    private String username;
    private String action;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private LocalDateTime date;

    protected LogOperation() {}

    public LogOperation(String username, String action, LocalDateTime date) {
        this.action = action;
        this.date = date;
        this.username = username;
    }

    @Override
    public String toString() {
        return "Username: " + username + "; Action: " + action + "; Date:" + date;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }
}