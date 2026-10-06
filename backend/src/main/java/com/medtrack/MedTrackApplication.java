package com.medtrack;

import com.medtrack.entity.User;
import com.medtrack.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class MedTrackApplication {

    public static void main(String[] args) {
        SpringApplication.run(MedTrackApplication.class, args);
    }

    @Bean
    public CommandLineRunner initDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@medtrack.com");
                admin.setPassword(passwordEncoder.encode("password123"));
                admin.setRole("ROLE_ADMIN");
                admin.setFullName("System Administrator");
                admin.setPhone("+1-555-0100");
                userRepository.save(admin);
                System.out.println("Default admin user created: admin / password123");
            }
        };
    }
}
