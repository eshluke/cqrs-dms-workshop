package com.cqrs.dinerbot.orders;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Orders {

    public enum Status {
        OPEN,
        CLOSED;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "kitchen_id")
    private Kitchen kitchen;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Orders() {
        this.status = Status.OPEN;
        this.kitchen = new Kitchen();
    }

    public void finishCooking() {
        Kitchen kitchen = getKitchen();
        if (!kitchen.isDone()) {
            kitchen.finish();
        }
    }

    public void startDelivery() {
        if (isReadyForDelivery()) {
            this.delivery = new Delivery();
        }
    }

    private boolean isReadyForDelivery() {
        return getKitchen().isDone() && getDelivery() == null;
    }

    public void finishDelivery() {
        Delivery delivery = getDelivery();
        if (delivery != null) {
            this.status = Status.CLOSED;
            delivery.finish();
        }
    }
}
