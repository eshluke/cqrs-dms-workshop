package com.cqrs.consumer;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MainController {

    @GetMapping
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("UP");
    }
}
