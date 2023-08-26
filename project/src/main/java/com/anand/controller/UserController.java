package com.anand.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.anand.entity.User;
import com.anand.entity.UserDto;
import com.anand.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/addUsers")
	public ResponseEntity<User> addUser(@RequestBody UserDto userDto){
		User response = userService.addUser(userDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

}
