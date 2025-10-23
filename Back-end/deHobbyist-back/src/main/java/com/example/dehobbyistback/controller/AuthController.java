package com.example.dehobbyistback.controller;

import com.example.dehobbyistback.dao.UserDao;
import com.example.dehobbyistback.model.User;
import com.example.dehobbyistback.config.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            User user = userDao.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Invalid credentials: User not found"));

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            String token = jwtUtil.generateToken(user);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "role", user.getRole().name()
            ));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }


    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userDao.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already taken.");
        }

        user.setPassword(userDao.loadUserByUsername(user.getUsername()).getPassword());
        userDao.saveUser(user);

        return ResponseEntity.ok("User registered successfully.");
    }
}
