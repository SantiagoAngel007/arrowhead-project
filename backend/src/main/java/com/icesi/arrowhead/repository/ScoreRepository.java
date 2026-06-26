package com.icesi.arrowhead.repository;

import com.icesi.arrowhead.domain.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    Optional<Score> findByUserIdAndChallengeId(Long userId, Long challengeId);

    List<Score> findByUserId(Long userId);

    List<Score> findByChallengeId(Long challengeId);

    // Suma de puntos por usuario para el ranking global
    @Query("SELECT s.user.id, SUM(s.points) FROM Score s WHERE s.completed = true GROUP BY s.user.id ORDER BY SUM(s.points) DESC")
    List<Object[]> findRankingGlobal();

    // Total de puntos de un usuario
    @Query("SELECT COALESCE(SUM(s.points), 0) FROM Score s WHERE s.user.id = :userId AND s.completed = true")
    Integer findTotalPointsByUserId(Long userId);
}
