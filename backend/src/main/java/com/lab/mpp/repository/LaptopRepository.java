package com.lab.mpp.repository;

import com.lab.mpp.LaptopController;
import com.lab.mpp.domain.Laptop;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class LaptopRepository {
    private List<Laptop> data;

    public LaptopRepository() {
        data = new ArrayList<>();
    }

    public void generateRandomData(int n) {
        data.clear();

        List <String> names = List.of("Asus Zenbook", "Lenovo Legion", "Macbook Pro", "Dell Vision", "HP");
        List <String> brand = List.of("Asus", "Lenovo", "Apple", "Dell", "HP");
        List <String> category = List.of("business", "gaming", "ultrabook");
        List <String> path = List.of("acer.jpg", "apple.jpg", "asus.jpg", "lenovo.jpg", "macbook.jpg", "msi.jpg");
        for (int i = 0; i < n; i++) {
            Random random = new Random();
            data.add(new Laptop(
                    names.get(random.nextInt((names.size()))) + data.size(),
                    brand.get(random.nextInt((brand.size()))),
                    category.get(random.nextInt((category.size()))),
                    "Descriere",
                    random.nextInt(26) + 2000,
                    random.nextInt(2000) + 1000,
                    path.get(random.nextInt(path.size()))));
        }
    }

    public List<Laptop> getData() {
        return data;
    }

    public Laptop getDataById(int id) {
        return data.stream().filter(laptop -> laptop.getId() == id).toList().getFirst();
    }

    public boolean updateData(int id, Laptop newLaptop) {
        for(Laptop laptop : data) {
            if (laptop.getId() == id) {
                laptop.brand = newLaptop.brand;
                laptop.path = newLaptop.path;
                laptop.year = newLaptop.year;
                laptop.price = newLaptop.price;
                laptop.name = newLaptop.name;
                laptop.description = newLaptop.description;
                laptop.category = newLaptop.category;
                return true;
            }
        }
        return false;
    }

    public void deleteData(int id) {
        data.remove(data.stream().filter(laptop -> laptop.getId() == id).toList().getFirst());
    }

    public void addData(Laptop laptop) {
        data.add(new Laptop(laptop.name, laptop.brand, laptop.category, laptop.description, laptop.year, laptop.price, laptop.path));
    }

    public void addRandomData(int n) {
        List <String> names = List.of("Asus Zenbook", "Lenovo Legion", "Macbook Pro", "Dell Vision", "HP");
        List <String> brand = List.of("Asus", "Lenovo", "Apple", "Dell", "HP");
        List <String> category = List.of("business", "gaming", "ultrabook");
        List <String> path = List.of("acer.jpg", "apple.jpg", "asus.jpg", "lenovo.jpg", "macbook.jpg", "msi.jpg");
        for (int i = 0; i < n; i++) {
            Random random = new Random();
            data.add(new Laptop(
                    names.get(random.nextInt((names.size()))) + data.size(),
                    brand.get(random.nextInt((brand.size()))),
                    category.get(random.nextInt((category.size()))),
                    "Descriere",
                    random.nextInt(26) + 2000,
                    random.nextInt(2000) + 1000,
                    path.get(random.nextInt(path.size()))));
        }
    }

    public List<Laptop> lastNth(int n) {
        return data.subList(data.size()-n, data.size());
    }
}
