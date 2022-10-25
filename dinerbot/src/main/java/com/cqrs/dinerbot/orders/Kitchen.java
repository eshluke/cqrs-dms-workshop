package com.cqrs.dinerbot.orders;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Kitchen {

    public enum Status {
        PROCESSING,
        DONE;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "kitchen_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private Status status;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Kitchen() {
        this.status = Status.PROCESSING;
    }

    public void finish() {
        this.status = Status.DONE;
    }

    public boolean isDone() {
        return this.status == Status.DONE;
    }
}
