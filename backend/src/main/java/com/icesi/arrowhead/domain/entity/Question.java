package com.icesi.arrowhead.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "questions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id", nullable = false)
    private Challenge challenge;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    // Puntos que otorga esta pregunta específica
    @Column(nullable = false)
    private Integer points;

    @Column(nullable = false)
    private Integer displayOrder;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Option> options;
}
