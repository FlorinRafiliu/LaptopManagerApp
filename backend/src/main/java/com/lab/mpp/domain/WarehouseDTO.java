package com.lab.mpp.domain;

import java.util.List;
import java.util.stream.Collectors;

public class WarehouseDTO {
    public Long wid;
    public String name;
    public String address;
    public List<LaptopDTO> laptops;

    public WarehouseDTO(Warehouse warehouse) {
        this.wid = warehouse.wid;
        this.name = warehouse.name;
        this.address = warehouse.address;
//        this.laptops = warehouse.laptops.stream()
//                .map(wl -> new LaptopDTO(wl.laptop))
//                .collect(Collectors.toList());
    }
}
