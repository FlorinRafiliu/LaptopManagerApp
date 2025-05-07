package com.lab.mpp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.AutoConfiguration;

import java.util.Set;

@Entity
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long wid;

    @OneToMany(mappedBy = "warehouse", fetch = FetchType.LAZY)
    public Set<WarehouseLaptop> laptops;

    protected Warehouse() {}

    public Warehouse(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public String name;
    public String address;
}
