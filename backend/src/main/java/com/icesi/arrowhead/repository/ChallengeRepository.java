package com.icesi.arrowhead.repository;

import com.icesi.arrowhead.domain.entity.Challenge;
import com.icesi.arrowhead.domain.enums.ChallengeLevel;
import com.icesi.arrowhead.domain.enums.ChallengeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    List<Challenge> findByStatusOrderByDisplayOrderAsc(ChallengeStatus status);

    List<Challenge> findByLevel(ChallengeLevel level);

    List<Challenge> findAllByOrderByDisplayOrderAsc();
}
