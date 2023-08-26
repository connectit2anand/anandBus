package com.anand.entity;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FeedbackDto {
	

	@Min(value=1, message="Rating must be in range of 1-5")  
	@Max(value=5, message="Rating must be in range of 1-5") 
	private Integer driverRating;
	
	@Min(value=1, message="Rating must be in range of 1-5")  
	@Max(value=5, message="Rating must be in range of 1-5")
	private Integer serviceRating;

	@Min(value=1, message="Rating must be in range of 1-5")
	@Max(value=5, message="Rating must be in range of 1-5")
	private Integer overallRating;
	
	private String comments;
}
