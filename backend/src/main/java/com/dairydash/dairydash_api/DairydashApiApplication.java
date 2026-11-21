package com.dairydash.dairydash_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

//@SpringBootApplication
@SpringBootApplication(scanBasePackages = "com.dairydash")
@EnableJpaRepositories(basePackages = "com.dairydash")
@EntityScan(basePackages = "com.dairydash")
public class DairydashApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DairydashApiApplication.class, args);
	}

}
