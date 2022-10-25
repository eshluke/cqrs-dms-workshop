package com.cqrs.dinerbot;

import com.cqrs.dinerbot.orders.Orders;
import com.cqrs.dinerbot.orders.OrdersRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
public class DinerBot {

    private final OrdersRepository ordersRepository;

    public DinerBot(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    public Long receiveOrder() {
        Orders orders = new Orders();
        ordersRepository.save(orders);
        log.info("order({}) received!", orders.getId());
        return orders.getId();
    }

    public void finishCooking(Long orderId) {
        Optional<Orders> orders = ordersRepository.findById(orderId);
        orders.ifPresent(Orders::finishCooking);
        log.info("finished cooking order {}!", orderId);
    }

    public void startDelivery(Long orderId) {
        Optional<Orders> orders = ordersRepository.findById(orderId);
        orders.ifPresent(Orders::startDelivery);
        log.info("order {} is being delivered!", orderId);
    }

    public void finishDelivery(Long orderId) {
        Optional<Orders> orders = ordersRepository.findById(orderId);
        orders.ifPresent(Orders::finishDelivery);
        log.info("order {} completed!", orderId);
    }
}
