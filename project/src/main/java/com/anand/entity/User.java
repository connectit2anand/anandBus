package com.anand.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
public class User {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer userID;
	 	

	    private String firstName;
	 	

	    private String lastName;
	 	
	 	
	    private String mobile;
	 	
	
	    private String email;
	 	

	    private String password;
	 
	    private Integer totalFeedBack = 0;
	 	

	    private Integer totalReservation = 0;
	    
	    
	    @JsonIgnore
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	    private List<UserBookingHistory> userBookingHistory = new ArrayList<>();
	    
	    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	    private List<Feedback> feedbackList = new ArrayList<>();
}
