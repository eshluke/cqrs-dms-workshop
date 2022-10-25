package com.cqrs.dinerbot.orders;

import org.springframework.data.repository.CrudRepository;

public interface OrdersRepository extends CrudRepository<Orders, Long> {
}
