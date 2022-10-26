package com.cqrs.consumer.message;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DmsMessage {
    private String payload;
    private Metadata metadata;
}
