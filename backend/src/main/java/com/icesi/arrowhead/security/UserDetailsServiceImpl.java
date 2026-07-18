package com.icesi.arrowhead.security;

import com.icesi.arrowhead.domain.entity.User;
import com.icesi.arrowhead.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String alias) throws UsernameNotFoundException {
        User user = userRepository.findByAlias(alias)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + alias));
        return new CustomUserDetails(user);
    }
}
