package com.qatar.soc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan( basePackages = {"com.qatar.soc"} )
public class SocServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocServiceApplication.class, args);
	}

}
