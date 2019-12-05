package com.qatar.soc.controller;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qatar.soc.model.Activity;
import com.qatar.soc.model.User;
import com.qatar.soc.repository.ActivityRepository;
import com.qatar.soc.repository.UserRepository;

@RestController
@RequestMapping("/soc")
public class SocController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	ActivityRepository activityRepository;

	@GetMapping("/users")
	public ResponseEntity<List<User>> listUsers() {
		return ResponseEntity.ok(userRepository.findAll());
	}
	
	@GetMapping("/users/{id}")
	public ResponseEntity<Optional<User>> getUser(@PathVariable(value = "id") final int id) {
		return ResponseEntity.ok(userRepository.findById(id));
	}

	@GetMapping("/activities")
	public ResponseEntity<List<Activity>> listActivities() {
		return ResponseEntity.ok(activityRepository.findAll());
	}

	@PostMapping("/activity")
	public ResponseEntity<String> createActivity(@RequestBody final Activity activity) {
		activityRepository.save(activity);
		return ResponseEntity.ok("Done");
	}

	@GetMapping("/users/{id}/block")
	@Transactional
	public ResponseEntity<String> blockUser(@PathVariable(value = "id") final int id) {
		User user = userRepository.getOne(id);
		user.setStatus("Blocked");
		userRepository.save(user);
		return ResponseEntity.ok("Done");
	}

	@GetMapping("/users/{id}/activate")
	@Transactional
	public ResponseEntity<String> activateUser(@PathVariable(value = "id") final int id) {
		User user = userRepository.getOne(id);
		user.setStatus("Active");
		userRepository.save(user);
		return ResponseEntity.ok("Done");
	}

	@GetMapping("/ping")
	public String ping() {
		return "pong";
	}

}
