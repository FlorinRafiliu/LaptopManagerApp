package com.lab.mpp.service;

import com.lab.mpp.domain.Laptop;
import com.lab.mpp.repository.LaptopRepository;

import java.util.List;

public class ServiceLaptop {

    private LaptopRepository laptopRepository;
    public ServiceLaptop(LaptopRepository laptopRepository) {
        this.laptopRepository = laptopRepository;
    }

    public List<Laptop> getData(int page) {
        return laptopRepository.getData().subList((page-1) * 10, Math.min(laptopRepository.getData().size(), page * 10));
    }
    public List<Laptop> getData() {
        return laptopRepository.getData();
    }

    public List<Laptop> getDataSortedByPrice(int page) {
        List <Laptop> data = laptopRepository.getData().stream().sorted(
                (l1, l2) -> {
                    if (l1.price < l2.price) return -1;
                    if (l1.price == l2.price) return 0;
                    return 1;
                }).toList();
        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public List<Laptop> getDataSortedByName(int page) {
        List <Laptop> data = laptopRepository.getData().stream().sorted(
                (l1, l2) -> l1.name.compareTo(l2.name)).toList();
        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public List<Laptop> getDataByCategory(int page, String category) {
        List <Laptop> data = laptopRepository.getData().stream().filter(l -> l.category.equals(category)).toList();
        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public List<Laptop> getDataFiltered(int page, String filter) {
        List <Laptop> data = laptopRepository.getData().stream().filter(l -> l.name.contains(filter)).toList();
        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public Laptop getDataById(int id) {
        return laptopRepository.getDataById(id);
    }

    public boolean updateData(int id, Laptop newLaptop) {
        return laptopRepository.updateData(id, newLaptop);
    }

    public void deleteData(int id) {
        laptopRepository.deleteData(id);
    }

    public void addData(Laptop laptop) {
        laptopRepository.addData(laptop);
    }

    public void addRandomData(int n) {
        laptopRepository.addRandomData(n);
    }

    public List<Laptop> lastNth(int n) {
        return laptopRepository.lastNth(n);
    }
}
