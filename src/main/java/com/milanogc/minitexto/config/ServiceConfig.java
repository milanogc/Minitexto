package com.milanogc.minitexto.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@ComponentScan("com.milanogc.minitexto.service")
@EnableAsync
public class ServiceConfig {
}