package userservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import userservice.model.User;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    Boolean existsByKeycloakId(String userId);

    User findByEmail(String email);
}