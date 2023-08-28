package com.anand.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.anand.entity.LoginUser;
import com.anand.service.LoginService;

@Controller
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("/loginUser")
	public ResponseEntity<String> loginUser(@RequestBody LoginUser loginUser){
		String response = loginService.addUser(loginUser);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}

}
