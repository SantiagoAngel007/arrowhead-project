package com.icesi.arrowhead.service.impl;

import com.icesi.arrowhead.domain.entity.Challenge;
import com.icesi.arrowhead.domain.entity.Option;
import com.icesi.arrowhead.domain.entity.Question;
import com.icesi.arrowhead.domain.enums.ChallengeStatus;
import com.icesi.arrowhead.dto.response.ChallengeResponse;
import com.icesi.arrowhead.dto.response.OptionResponse;
import com.icesi.arrowhead.dto.response.QuestionResponse;
import com.icesi.arrowhead.exception.ResourceNotFoundException;
import com.icesi.arrowhead.repository.ChallengeRepository;
import com.icesi.arrowhead.service.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {

    private final ChallengeRepository challengeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ChallengeResponse> findAllEnabled() {
        return challengeRepository.findByStatusOrderByDisplayOrderAsc(ChallengeStatus.ENABLED)
                .stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ChallengeResponse> findAll() {
        return challengeRepository.findAllByOrderByDisplayOrderAsc()
                .stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ChallengeResponse findById(Long id) {
        return toResponse(getChallengeOrThrow(id));
    }

    @Override
    public ChallengeResponse toggleStatus(Long id) {
        Challenge challenge = getChallengeOrThrow(id);
        challenge.setStatus(challenge.getStatus() == ChallengeStatus.ENABLED
                ? ChallengeStatus.DISABLED
                : ChallengeStatus.ENABLED);
        return toResponse(challengeRepository.save(challenge));
    }

    private Challenge getChallengeOrThrow(Long id) {
        return challengeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reto no encontrado: " + id));
    }

    private ChallengeResponse toResponse(Challenge challenge) {
        List<QuestionResponse> questions = challenge.getQuestions() == null ? List.of()
                : challenge.getQuestions().stream()
                        .sorted(Comparator.comparing(Question::getDisplayOrder))
                        .map(this::toResponse)
                        .toList();

        return ChallengeResponse.builder()
                .id(challenge.getId())
                .name(challenge.getName())
                .description(challenge.getDescription())
                .level(challenge.getLevel().name())
                .status(challenge.getStatus().name())
                .maxPoints(challenge.getMaxPoints())
                .displayOrder(challenge.getDisplayOrder())
                .questions(questions)
                .build();
    }

    private QuestionResponse toResponse(Question question) {
        List<OptionResponse> options = question.getOptions() == null ? List.of()
                : question.getOptions().stream().map(this::toResponse).toList();

        return QuestionResponse.builder()
                .id(question.getId())
                .text(question.getText())
                .points(question.getPoints())
                .displayOrder(question.getDisplayOrder())
                .options(options)
                .build();
    }

    private OptionResponse toResponse(Option option) {
        return OptionResponse.builder()
                .id(option.getId())
                .label(option.getLabel())
                .text(option.getText())
                .build();
    }
}
