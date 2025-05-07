package com.lab.mpp.service;

import com.lab.mpp.domain.Laptop;
import com.lab.mpp.repository.LaptopRepository;
import com.lab.mpp.repository.LaptopRepositoryDB;
import com.lab.mpp.repository.WarehouseLaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ServiceLaptopDB {

    private LaptopRepositoryDB laptopRepositoryDB;

    private WarehouseLaptopRepository warehouseLaptopRepository;

    @Autowired
    public ServiceLaptopDB(LaptopRepositoryDB laptopRepositoryDB, WarehouseLaptopRepository warehouseLaptopRepository) {
        this.laptopRepositoryDB = laptopRepositoryDB;
        this.warehouseLaptopRepository = warehouseLaptopRepository;
    }

    public List<Laptop> getData(int page) {
        return laptopRepositoryDB.findAll(PageRequest.of(page-1, 10)).toList();
        //return laptopRepositoryDB.findAll().subList((page-1) * 10, Math.min(laptopRepositoryDB.findAll().size(), page * 10));
    }

    public List<Laptop> getData() {
        return laptopRepositoryDB.findAll();
    }

    public List<Integer> getIds(int year) {
        return laptopRepositoryDB.findLaptopIdsReleasedAfterNative(year);
    }

    public List<Laptop> getDataSortedByPrice(int page) {
        return laptopRepositoryDB.findAll(PageRequest.of(page-1, 10, Sort.by("price").ascending())).toList();
//        List <Laptop> data = laptopRepositoryDB.findAll().stream().sorted(
//                (l1, l2) -> {
//                    if (l1.price < l2.price) return -1;
//                    if (l1.price == l2.price) return 0;
//                    return 1;
//                }).toList();
//        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public List<Laptop> getDataSortedByName(int page) {
        return laptopRepositoryDB.findAll(PageRequest.of(page-1, 10, Sort.by("name").ascending())).toList();

//        List <Laptop> data = laptopRepositoryDB.findAll().stream().sorted(
//                (l1, l2) -> l1.name.compareTo(l2.name)).toList();
//        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public List<Laptop> getDataByCategory(int page, String category) {
        return laptopRepositoryDB.findAllByCategoryEquals(category, PageRequest.of(page-1, 10));

//        List <Laptop> data = laptopRepositoryDB.findAll().stream().filter(l -> l.category.equals(category)).toList();
//        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public List<Laptop> getDataFiltered(int page, String filter) {
        return laptopRepositoryDB.findAllByNameContaining(filter, PageRequest.of(page-1, 10));
//        List <Laptop> data = laptopRepositoryDB.findAll().stream().filter(l -> l.name.contains(filter)).toList();
//        return data.subList((page-1) * 10, Math.min(data.size(), page * 10));
    }

    public Laptop getDataById(Long id) {
        return laptopRepositoryDB.findById(id).get();
    }

    public boolean updateData(Long id, Laptop newLaptop) {
        Optional<Laptop> laptop = laptopRepositoryDB.findById(id);
        if(laptop.isPresent()) {
            Laptop laptop1 = laptop.get();
            laptop1.name = newLaptop.name;
            laptop1.year = newLaptop.year;
            laptop1.price = newLaptop.price;
            laptop1.category = newLaptop.category;
            laptop1.description = newLaptop.description;
            laptop1.brand = newLaptop.brand;
            laptop1.path = newLaptop.path;
            laptopRepositoryDB.save(laptop1);
            return true;
        }
        return false;
    }

    public void deleteData(Long id) {
        warehouseLaptopRepository.deleteByLaptopId(id);
        laptopRepositoryDB.deleteById(id);
    }

    public void addData(Laptop laptop) {
        laptopRepositoryDB.save(laptop);
    }

    public void addRandomData(int n) {
        List <String> names = List.of("Asus Zenbook", "Lenovo Legion", "Macbook Pro", "Dell Vision", "HP");
        List <String> brand = List.of("Asus", "Lenovo", "Apple", "Dell", "HP");
        List <String> category = List.of("business", "gaming", "ultrabook");
        List <String> path = List.of("acer.jpg", "apple.jpg", "asus.jpg", "lenovo.jpg", "macbook.jpg", "msi.jpg");
        for (int i = 0; i < n; i++) {
            Random random = new Random();
            laptopRepositoryDB.save(new Laptop(
                    names.get(random.nextInt((names.size()))) + laptopRepositoryDB.findAll().size(),
                    brand.get(random.nextInt((brand.size()))),
                    category.get(random.nextInt((category.size()))),
                    "Descriere",
                    random.nextInt(26) + 2000,
                    random.nextInt(2000) + 1000,
                    path.get(random.nextInt(path.size()))));
        }
    }

    public List<Laptop> lastNth(int n) {
        return laptopRepositoryDB.findAll().subList(laptopRepositoryDB.findAll().size()-n, laptopRepositoryDB.findAll().size());
    }
}
