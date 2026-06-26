package com.icesi.arrowhead.dto.request;

import com.icesi.arrowhead.domain.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserUpdateRequest {

    @Size(min = 3, max = 50)
    private String alias;

    @Email
    private String email;

    private Role role;

    private Boolean active;
}
