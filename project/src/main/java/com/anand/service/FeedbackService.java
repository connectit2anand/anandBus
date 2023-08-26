package com.anand.service;

import com.anand.entity.Feedback;
import com.anand.entity.FeedbackDto;

public interface FeedbackService {

	Feedback addFeedback(FeedbackDto feedbackDto, Integer userId);

}
