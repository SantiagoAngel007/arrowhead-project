package com.icesi.arrowhead.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "scores",
       uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "challenge_id"}))
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(nullable = false)
    private Integer points;

    // Cuántos intentos fallidos tuvo antes de completarlo
    @Column(nullable = false)
    private Integer attempts = 0;

    @Column(nullable = false)
    private Boolean completed = false;

    @CreationTimestamp
    private LocalDateTime completedAt;
}
