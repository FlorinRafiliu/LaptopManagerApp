package com.lab.mpp.repository;

import com.lab.mpp.domain.WarehouseLaptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface WarehouseLaptopRepository extends JpaRepository<WarehouseLaptop, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM WarehouseLaptop wl WHERE wl.laptop.id = :laptopId")
    void deleteByLaptopId(@Param("laptopId") Long laptopId);
}
