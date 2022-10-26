package com.cqrs.consumer.view;

import org.springframework.data.repository.CrudRepository;

public interface OrderViewRepository extends CrudRepository<OrderView, Long> {
}
