package com.icesi.arrowhead.service.impl;

import com.icesi.arrowhead.domain.entity.*;
import com.icesi.arrowhead.dto.request.AnswerRequest;
import com.icesi.arrowhead.dto.response.AnswerResultResponse;
import com.icesi.arrowhead.dto.response.ScoreResponse;
import com.icesi.arrowhead.exception.BadRequestException;
import com.icesi.arrowhead.exception.ResourceNotFoundException;
import com.icesi.arrowhead.repository.*;
import com.icesi.arrowhead.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final QuestionRepository questionRepository;
    private final OptionRepository optionRepository;
    private final ScoreRepository scoreRepository;
    private final UserAnswerRepository userAnswerRepository;

    @Override
    @Transactional
    public AnswerResultResponse submitAnswer(Long userId, Long challengeId, AnswerRequest request) {
        Question question = questionRepository.findById(request.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Pregunta no encontrada: " + request.getQuestionId()));
        if (!question.getChallenge().getId().equals(challengeId)) {
            throw new BadRequestException("La pregunta no pertenece a este reto");
        }

        Option option = optionRepository.findById(request.getOptionId())
                .orElseThrow(() -> new ResourceNotFoundException("Opción no encontrada: " + request.getOptionId()));
        if (!option.getQuestion().getId().equals(question.getId())) {
            throw new BadRequestException("La opción no pertenece a esta pregunta");
        }

        var existing = userAnswerRepository.findByUserIdAndQuestionId(userId, question.getId());
        if (existing.isPresent()) {
            return AnswerResultResponse.builder()
                    .correct(true)
                    .pointsEarned(0)
                    .message("Ya habías respondido correctamente esta pregunta")
                    .build();
        }

        User user = getUserOrThrow(userId);
        Challenge challenge = question.getChallenge();
        Score score = getOrCreateScore(user, challenge);

        if (Boolean.TRUE.equals(option.getCorrect())) {
            userAnswerRepository.save(UserAnswer.builder()
                    .user(user).question(question).option(option).correct(true).build());

            score.setPoints(score.getPoints() + question.getPoints());
            updateCompletion(score, challenge);
            scoreRepository.save(score);

            return AnswerResultResponse.builder()
                    .correct(true)
                    .pointsEarned(question.getPoints())
                    .message("¡Correcto! +" + question.getPoints() + " pts")
                    .build();
        }

        score.setAttempts(score.getAttempts() + 1);
        scoreRepository.save(score);

        return AnswerResultResponse.builder()
                .correct(false)
                .pointsEarned(0)
                .message("Respuesta incorrecta, intenta de nuevo")
                .build();
    }

    @Override
    @Transactional
    public AnswerResultResponse submitFlag(Long userId, Long challengeId, String flag) {
        Challenge challenge = getChallengeOrThrow(challengeId);
        if (challenge.getFlag() == null) {
            throw new BadRequestException("Este reto no se completa con una flag");
        }

        User user = getUserOrThrow(userId);
        Score score = getOrCreateScore(user, challenge);

        if (score.getCompleted()) {
            return AnswerResultResponse.builder()
                    .correct(true)
                    .pointsEarned(0)
                    .message("Ya habías encontrado la contraseña de este reto")
                    .build();
        }

        if (challenge.getFlag().equals(flag.trim())) {
            int questionPoints = questionRepository.findByChallengeIdOrderByDisplayOrderAsc(challengeId)
                    .stream().mapToInt(Question::getPoints).sum();
            int flagPoints = challenge.getMaxPoints() - questionPoints;

            score.setPoints(score.getPoints() + flagPoints);
            score.setCompleted(true);
            scoreRepository.save(score);

            return AnswerResultResponse.builder()
                    .correct(true)
                    .pointsEarned(flagPoints)
                    .message("¡Correcto! Flag válida — +" + flagPoints + " pts")
                    .build();
        }

        score.setAttempts(score.getAttempts() + 1);
        scoreRepository.save(score);

        return AnswerResultResponse.builder()
                .correct(false)
                .pointsEarned(0)
                .message("Flag incorrecta, sigue buscando")
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public ScoreResponse getScore(Long userId, Long challengeId) {
        Challenge challenge = getChallengeOrThrow(challengeId);
        return scoreRepository.findByUserIdAndChallengeId(userId, challengeId)
                .map(score -> ScoreResponse.builder()
                        .points(score.getPoints())
                        .maxPoints(challenge.getMaxPoints())
                        .completed(score.getCompleted())
                        .attempts(score.getAttempts())
                        .build())
                .orElseGet(() -> ScoreResponse.builder()
                        .points(0)
                        .maxPoints(challenge.getMaxPoints())
                        .completed(false)
                        .attempts(0)
                        .build());
    }

    // Un reto sin flag se completa cuando se acumulan todos los puntos de sus
    // preguntas; un reto con flag solo se completa al enviar la flag correcta.
    private void updateCompletion(Score score, Challenge challenge) {
        if (challenge.getFlag() == null && score.getPoints() >= challenge.getMaxPoints()) {
            score.setCompleted(true);
        }
    }

    private Score getOrCreateScore(User user, Challenge challenge) {
        return scoreRepository.findByUserIdAndChallengeId(user.getId(), challenge.getId())
                .orElseGet(() -> Score.builder()
                        .user(user).challenge(challenge)
                        .points(0).attempts(0).completed(false)
                        .build());
    }

    private User getUserOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + userId));
    }

    private Challenge getChallengeOrThrow(Long challengeId) {
        return challengeRepository.findById(challengeId)
                .orElseThrow(() -> new ResourceNotFoundException("Reto no encontrado: " + challengeId));
    }
}
