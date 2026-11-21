package com.dairydash.config;

import java.net.http.HttpRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;

    SecurityConfig(CorsConfigurationSource corsConfigurationSource) {
        this.corsConfigurationSource = corsConfigurationSource;
    }
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http, CorsConfigurationSource corsConfigurationSource) throws Exception{
		http
		.cors(cors -> cors.configurationSource(corsConfigurationSource))
		.csrf(csrf -> csrf.disable())
		.authorizeHttpRequests(auth -> auth
				.requestMatchers(
						"/api/v1/health",
						"/api/v1/health/**",
						"/actuator/health",
						"/actuator/health/**",
						"/api/v1/categories/",
						"/api/v1/categories/**",
						"/api/v1/products/",
						"/api/v1/products/**",
						"/api/v1/suppliers/",
						"/api/v1/suppliers/**",
						"/api/v1/inventory/**",
						"/api/v1/purchase-orders/**",
						"/api/v1/warehouses/**",
						"/api/v1/team-members/**",
						"/api/v1/reports/**"
				).permitAll()
				.anyRequest()
				.authenticated()
		)
		.formLogin(form -> form.disable())
		.httpBasic(basic -> basic.disable());
		
		return http.build();
	}
}
