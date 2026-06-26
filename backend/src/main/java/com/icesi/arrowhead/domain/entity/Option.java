package com.icesi.arrowhead.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "options")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Option {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String text;

    // Solo el backend sabe cuál es correcta; nunca se expone en el DTO de respuesta al cliente
    @Column(nullable = false)
    private Boolean correct;

    @Column(length = 1)
    private String label; // A, B, C, D
}
