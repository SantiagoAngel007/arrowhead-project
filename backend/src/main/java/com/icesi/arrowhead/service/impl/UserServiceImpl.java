package com.icesi.arrowhead.service.impl;

import com.icesi.arrowhead.domain.entity.Score;
import com.icesi.arrowhead.domain.entity.User;
import com.icesi.arrowhead.dto.request.UserUpdateRequest;
import com.icesi.arrowhead.dto.response.UserResponse;
import com.icesi.arrowhead.exception.ResourceNotFoundException;
import com.icesi.arrowhead.repository.ScoreRepository;
import com.icesi.arrowhead.repository.UserRepository;
import com.icesi.arrowhead.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ScoreRepository scoreRepository;

    @Override
    public List<UserResponse> findAll() {
        return userRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    public UserResponse findById(Long id) {
        return toResponse(getUserOrThrow(id));
    }

    @Override
    public UserResponse update(Long id, UserUpdateRequest request) {
        User user = getUserOrThrow(id);

        if (request.getAlias() != null) {
            user.setAlias(request.getAlias());
        }
        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        return toResponse(userRepository.save(user));
    }

    @Override
    public void delete(Long id) {
        User user = getUserOrThrow(id);
        userRepository.delete(user);
    }

    @Override
    public UserResponse toggleActive(Long id) {
        User user = getUserOrThrow(id);
        user.setActive(!user.getActive());
        return toResponse(userRepository.save(user));
    }

    private User getUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + id));
    }

    private UserResponse toResponse(User user) {
        List<Score> scores = scoreRepository.findByUserId(user.getId());
        int totalScore = scores.stream().filter(Score::getCompleted).mapToInt(Score::getPoints).sum();
        long challengesCompleted = scores.stream().filter(Score::getCompleted).count();

        return UserResponse.builder()
                .id(user.getId())
                .alias(user.getAlias())
                .email(user.getEmail())
                .role(user.getRole().name())
                .active(user.getActive())
                .totalScore(totalScore)
                .challengesCompleted((int) challengesCompleted)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
