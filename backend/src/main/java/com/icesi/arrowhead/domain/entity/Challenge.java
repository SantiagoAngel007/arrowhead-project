package com.icesi.arrowhead.domain.entity;

import com.icesi.arrowhead.domain.enums.ChallengeLevel;
import com.icesi.arrowhead.domain.enums.ChallengeStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "challenges")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Challenge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChallengeLevel level;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChallengeStatus status;

    // Puntos máximos que otorga este reto
    @Column(nullable = false)
    private Integer maxPoints;

    // Orden de aparición en la UI
    @Column(nullable = false)
    private Integer displayOrder;

    // Flag esperada para completar el reto vía envío directo (ej. contraseña
    // encontrada en una captura). NULL si el reto solo se completa por preguntas.
    private String flag;

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions;

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Score> scores;
}
