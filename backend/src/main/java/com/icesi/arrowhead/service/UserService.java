package com.icesi.arrowhead.service;

import com.icesi.arrowhead.dto.request.UserUpdateRequest;
import com.icesi.arrowhead.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    List<UserResponse> findAll();

    UserResponse findById(Long id);

    UserResponse update(Long id, UserUpdateRequest request);

    void delete(Long id);

    // Activa o desactiva un usuario sin eliminarlo
    UserResponse toggleActive(Long id);
}
