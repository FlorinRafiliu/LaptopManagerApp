package com.lab.mpp.domain;

import jakarta.persistence.*;

import java.util.List;
import java.util.stream.Collectors;

public class LaptopDTO {
    public Integer id;
    public String name;
    public String brand;
    public String category;
    public String description;
    public Integer year;
    public int price;
    public String path;

    public List<WarehouseDTO> warehouses;


    public LaptopDTO(Laptop laptop) {
        this.id = laptop.getId();
        this.name = laptop.name;
        this.brand = laptop.brand;
        this.category = laptop.category;
        this.price = laptop.price;
        this.description = laptop.description;
        this.year = laptop.year;
        this.path = laptop.path;

        this.warehouses = laptop.warehouses.stream()
                .map(wl -> new WarehouseDTO(wl.warehouse))
                .collect(Collectors.toList());
    }
}