package com.lab.mpp.repository;

import com.lab.mpp.domain.LogOperation;
import com.lab.mpp.service.LogOperationService;
import org.apache.juli.logging.Log;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public interface LogOperationRepository extends JpaRepository<LogOperation, Long> {
    @Query("SELECT l FROM LogOperation l ORDER BY l.date DESC")
    List<LogOperation> findTop30ByOrderByDateDesc(Pageable pageable);

    default List<LogOperation> findLast30() {
        return findTop30ByOrderByDateDesc(PageRequest.of(0, 30));
    }
}
