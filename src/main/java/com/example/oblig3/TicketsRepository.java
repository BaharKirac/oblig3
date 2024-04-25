package com.example.oblig3;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketsRepository extends JpaRepository<TicketModel, Long> {
    List<TicketModel> findAll();
}