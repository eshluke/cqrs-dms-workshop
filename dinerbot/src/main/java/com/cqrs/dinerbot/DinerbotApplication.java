package com.cqrs.dinerbot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DinerbotApplication {

	public static void main(String[] args) {
		SpringApplication.run(DinerbotApplication.class, args);
	}

}
