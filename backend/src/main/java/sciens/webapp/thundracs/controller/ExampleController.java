package sciens.webapp.thundracs.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleController {
    
    @GetMapping("/hello")
    @CrossOrigin(origins = "http://localhost:5173")
    public String hello() {
        return "Hello from Spring Boot Backend!";
    }
}