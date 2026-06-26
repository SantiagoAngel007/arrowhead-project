package com.icesi.arrowhead.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String alias;
    private String email;
    private String role;
    private Boolean active;
    private Integer totalScore;
    private Integer challengesCompleted;
    private LocalDateTime createdAt;
}
