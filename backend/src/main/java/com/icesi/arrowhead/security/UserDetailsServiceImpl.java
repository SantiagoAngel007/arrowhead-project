package com.icesi.arrowhead.security;

import com.icesi.arrowhead.domain.entity.User;
import com.icesi.arrowhead.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));

        // TODO: construir y retornar el UserDetails con authorities basadas en el rol
        // Ejemplo:
        // return new org.springframework.security.core.userdetails.User(
        //     user.getEmail(),
        //     user.getPassword(),
        //     List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()))
        // );
        throw new UnsupportedOperationException("Implementar loadUserByUsername");
    }
}
