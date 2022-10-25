package com.cqrs.dinerbot;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    private final DinerBot dinerBot;


    public MainController(DinerBot dinerBot) {
        this.dinerBot = dinerBot;
    }

    @PostMapping
    public ResponseEntity<Long> task1() {
        Long oid = dinerBot.receiveOrder();
        return ResponseEntity.ok(oid);
    }

    @PutMapping("/{id}/cook")
    public ResponseEntity<Long> task2(@PathVariable Long id) {
        dinerBot.finishCooking(id);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/{id}/deliver")
    public ResponseEntity<Long> task3(@PathVariable Long id) {
        dinerBot.startDelivery(id);
        return ResponseEntity.ok(id);
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<Long> task4(@PathVariable Long id) {
        dinerBot.finishDelivery(id);
        return ResponseEntity.ok(id);
    }
}
