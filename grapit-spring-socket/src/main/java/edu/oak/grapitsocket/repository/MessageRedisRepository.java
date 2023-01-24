package edu.oak.grapitsocket.repository;

import edu.oak.grapitsocket.domain.MessageBase;
import org.springframework.data.repository.CrudRepository;

public interface MessageRedisRepository extends CrudRepository<MessageBase, String> {


}
