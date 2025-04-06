package com.lab.mpp.domain;

import java.util.Map;

public class Operation {
    private String type; // "create", "update", "delete"
    private Map<String, Object> payload;

    // Getters and setters
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Map<String, Object> getPayload() { return payload; }
    public void setPayload(Map<String, Object> payload) { this.payload = payload; }
}