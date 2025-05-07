package com.lab.mpp.service;

import com.lab.mpp.domain.Laptop;
import com.lab.mpp.domain.Warehouse;
import com.lab.mpp.domain.WarehouseLaptop;
import com.lab.mpp.repository.LaptopRepository;
import com.lab.mpp.repository.LaptopRepositoryDB;
import com.lab.mpp.repository.WarehouseLaptopRepository;
import com.lab.mpp.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WarehouseLaptopService {

    @Autowired
    private WarehouseLaptopRepository warehouseLaptopRepository;

    @Autowired
    private LaptopRepositoryDB laptopRepository;

    @Autowired
    private WarehouseRepository warehouseRepository;

    public void addLaptopToWarehouse(Long laptopId, Long warehouseId) {
        Laptop laptop = laptopRepository.findById(laptopId)
                .orElseThrow(() -> new RuntimeException("Laptop not found"));
        Warehouse warehouse = warehouseRepository.findById(warehouseId)
                .orElseThrow(() -> new RuntimeException("Warehouse not found"));

        WarehouseLaptop warehouseLaptop = new WarehouseLaptop();
        warehouseLaptop.laptop = laptop;
        warehouseLaptop.warehouse = warehouse;

        warehouseLaptopRepository.save(warehouseLaptop);
    }
}