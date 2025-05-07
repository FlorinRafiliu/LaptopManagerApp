package com.lab.mpp.domain;

import jakarta.persistence.*;

@Entity
public class WarehouseLaptop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wlid;

    @ManyToOne
    @JoinColumn(name = "laptop_id")
    public Laptop laptop;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    public Warehouse warehouse;

    public WarehouseLaptop() {}
}
