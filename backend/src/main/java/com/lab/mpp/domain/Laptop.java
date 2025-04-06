package com.lab.mpp.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

public class Laptop {
    private static int nextID = 0;
    public int id;
    public String name;
    public String brand;
    public String category;
    public String description;
    public int year;
    public int price;
    public String path;

    public Laptop(String name, String brand, String category, String description, int year, int price, String path) {
        this.id = nextID++;
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