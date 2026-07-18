package com.icesi.arrowhead.repository;

import com.icesi.arrowhead.domain.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAnswerRepository extends JpaRepository<UserAnswer, Long> {

    Optional<UserAnswer> findByUserIdAndQuestionId(Long userId, Long questionId);
}
