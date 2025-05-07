package com.lab.mpp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name ="Laptop",indexes = @Index(name = "year_index", columnList = "year"))
public class Laptop {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;

    @OneToMany(mappedBy = "laptop", fetch = FetchType.LAZY)
    public Set <WarehouseLaptop> warehouses;

    public String name;
    public String brand;
    public String category;
    public String description;
    public int year;
    public int price;
    public String path;

    protected Laptop() { }

    public Laptop(String name, String brand, String category, String description, int year, int price, String path) {
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.year = year;
        this.price = price;
        this.path = path;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getBrand() {
        return this.brand;
    }

    public String  getCategory() {
        return this.category;
    }

    public String getDescription() {
        return this.description;
    }

    public String getPath() {
        return this.path;
    }

    public int getYear() {
        return this.year;
    }

    public int getPrice() {
        return this.price;
    }
}

//{
//id: 1,
//name: "ACER Aspire 3",
//brand: "Acer",
//category: "business",
//description: "Alege Aspire 3 cu cele mai recente procesoare AMD Ryzen Series create pentru multitasking si productivitate. Usor de utilizat, acest laptop este potrivit pentru orice activitate.",
//year: 2024,
//price: 1899,
//path: 'acer.jpg',
//        }