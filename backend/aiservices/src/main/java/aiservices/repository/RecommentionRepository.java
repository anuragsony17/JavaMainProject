package aiservices.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import aiservices.models.Recommended;
import java.util.List;
import java.util.Optional;

public interface RecommentionRepository extends MongoRepository<Recommended, String> {
    List<Recommended> findByUserId(String userId);

    Optional<Recommended> findByActivityId(String activityId);

}
