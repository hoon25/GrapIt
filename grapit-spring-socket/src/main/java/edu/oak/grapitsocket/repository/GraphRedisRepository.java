package edu.oak.grapitsocket.repository;

import edu.oak.grapitsocket.domain.GraphBase;
import org.springframework.data.repository.CrudRepository;

public interface GraphRedisRepository extends CrudRepository<GraphBase, String> {


}
