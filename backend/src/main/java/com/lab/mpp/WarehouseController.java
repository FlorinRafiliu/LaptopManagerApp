package com.lab.mpp;


import com.lab.mpp.domain.Laptop;
import com.lab.mpp.domain.Warehouse;
import com.lab.mpp.domain.WarehouseDTO;
import com.lab.mpp.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/warehouses")
public class WarehouseController {

    private final WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseController(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<WarehouseDTO> get() {
        return warehouseRepository.findAll().stream().map(WarehouseDTO::new).toList();
    }
}
