package com.cqrs.dinerbot.orders;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Delivery {

    public enum Status {
        IN_DELIVERY,
        DELIVERED;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "delivery_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private Status status;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Delivery() {
        this.status = Status.IN_DELIVERY;
    }

    public void finish() {
        this.status = Status.DELIVERED;
    }
}
