package com.ReactSpring.controller;

import com.ReactSpring.entity.Rent;
import com.ReactSpring.repository.RentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class RentController {

    @Autowired
    private RentRepository rentRepository;

    @GetMapping("/rent")
    public List<Rent> getDistinctRentsByUserId() {
        return rentRepository.findDistinctByUserId();
    }
}
