package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class HelloTest {
    @Autowired
    TicketsRepository ticketsRepositry;
    @PostMapping(value="/newticket", consumes = "application/json", produces = "application/json")
    public String ticketSubmitted(@RequestBody TicketModel ticketModel) {
        //System.out.println(text);
        System.out.println(ticketModel.toString());
        TicketModel _tutorial = ticketsRepositry
                .save(new TicketModel(ticketModel.getFilmname(), ticketModel.getQuantity(), ticketModel.getFirstname(),ticketModel.getLastname(), ticketModel.getPhonenumber(), ticketModel.getEmail()));
        //return new ResponseEntity<>(_tutorial, HttpStatus.CREATED);

        return "{\"msg\":\"Greetings from Spring Boot!\"}";
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketModel>> findByPublished() {
        try {
            List<TicketModel> tickets = ticketsRepositry.findAll();

            if (tickets.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tickets, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}