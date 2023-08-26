package com.anand.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.anand.entity.Feedback;
import com.anand.entity.FeedbackDto;
import com.anand.service.FeedbackService;

@RestController
public class FeedbackController {
	@Autowired
	private FeedbackService feedbackService;
	
	@PostMapping("/addFeedback/{userId}")
	public ResponseEntity<Feedback> addFeedback(@RequestBody FeedbackDto feedbackDto, 
												@PathVariable Integer userId){
		Feedback response = feedbackService.addFeedback(feedbackDto,userId);
		return new ResponseEntity<Feedback>(response,HttpStatus.OK);
	}

}
