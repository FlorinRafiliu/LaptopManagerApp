package com.lab.mpp.repository;

import com.lab.mpp.domain.Laptop;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LaptopRepositoryDB extends JpaRepository<Laptop, Long> {
    List<Laptop> findAllByNameContaining(String filter, Pageable pageable);
    List<Laptop> findAllByCategoryEquals(String category, Pageable pageable);

    @Query(value = "SELECT id FROM laptop WHERE year > :year", nativeQuery = true)
    List<Integer> findLaptopIdsReleasedAfterNative(@Param("year") int year);
}
