package com.anand.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anand.entity.Feedback;
import com.anand.entity.Reservation;
import com.anand.entity.User;
import com.anand.entity.UserBookingHistory;
import com.anand.entity.UserDto;
import com.anand.exception.UserException;
import com.anand.repository.UserRepository;
import com.anand.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;

	@Override
	public User addUser(UserDto userDto) {
		String email = userDto.getEmail();
		List<User> userList = userRepository.findByEmail(email);
		if(userList.size()!= 0) {
			throw new UserException("Please enter unique email id to register");
		}
		User user = new User();
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setMobile(userDto.getMobile());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		List<UserBookingHistory> ubh = new ArrayList<>();
		user.setUserBookingHistory(ubh);
		List<Feedback> feedbackList = new ArrayList();
		user.setFeedbackList(feedbackList);
		user.setTotalFeedBack(feedbackList.size());
		userRepository.save(user);
		return user;
	}

}
