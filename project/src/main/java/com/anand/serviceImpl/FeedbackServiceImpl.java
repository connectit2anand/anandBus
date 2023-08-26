package com.anand.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.anand.entity.Feedback;
import com.anand.entity.FeedbackDto;
import com.anand.entity.User;
import com.anand.exception.UserException;
import com.anand.repository.FeedbackRepository;
import com.anand.repository.UserRepository;
import com.anand.service.FeedbackService;
@Service
public class FeedbackServiceImpl implements FeedbackService{
	
	@Autowired
	private FeedbackRepository feedbackRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public Feedback addFeedback(FeedbackDto feedbackDto, Integer userId) {
		User user = userRepository.findById(userId).orElseThrow(()-> new UserException("User id is not valid"));
		Feedback feedback = new Feedback();
		feedback.setDriverRating(feedbackDto.getDriverRating());
		feedback.setServiceRating(feedbackDto.getServiceRating());
		feedback.setOverallRating(feedbackDto.getOverallRating());
		feedback.setComments(feedbackDto.getComments());
		feedback.setFeedbackDateTime(LocalDateTime.now());
		List<Feedback> feedbackList = user.getFeedbackList();
		feedbackList.add(feedback);
		user.setFeedbackList(feedbackList);
		feedback.setUser(user);
		int totalFeedback = user.getTotalFeedBack();
		user.setTotalFeedBack(totalFeedback + 1);
		userRepository.save(user);
		
		
		return feedback;
	}

}
