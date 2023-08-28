package com.anand.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anand.entity.LoginUser;
import com.anand.entity.User;
import com.anand.exception.UserException;
import com.anand.repository.UserRepository;
import com.anand.service.LoginService;
@Service
public class LoginServiceImpl implements LoginService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public String addUser(LoginUser loginUser) {
		String email = loginUser.getEmail();
		String password = loginUser.getPassword();
		List<User> userList = userRepository.findByEmail(email);
		if(userList.size() == 0) {
			throw new UserException("Invalid Credential");
		}
		User user = userList.get(0);
		if(!user.getPassword().equals(password)) {
			throw new UserException("Invalid Credential");
		}
		return "Successfully LoggedIn";
	}
	
	
	
}
