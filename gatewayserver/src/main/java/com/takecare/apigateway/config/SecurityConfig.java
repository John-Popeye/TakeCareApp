package com.takecare.apigateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;

import org.springframework.security.web.server.SecurityWebFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
class SecurityConfig  {
    @Bean
     SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http.authorizeExchange(exchanges -> {
            exchanges.pathMatchers("/post-service/v1/posts/page/**").permitAll().anyExchange().authenticated();
        })
                .oauth2ResourceServer().jwt(withDefaults());
        http.csrf().disable();
        return http.build();
    }


}