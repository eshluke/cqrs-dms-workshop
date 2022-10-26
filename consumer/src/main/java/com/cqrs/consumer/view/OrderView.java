package com.cqrs.consumer.view;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders_history")
@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderView {
    @Id
    private Long ordersId;
    private String ordersStatus;
    private Long kitchenId;
    private String kitchenStatus;
    private Long deliveryId;
    private String deliveryStatus;
}
