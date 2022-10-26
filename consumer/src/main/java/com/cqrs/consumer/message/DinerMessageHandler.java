package com.cqrs.consumer.message;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@KafkaListener(topics = {"${kafka.topic.diner}"})
public class DinerMessageHandler {

    public void onMessage(DmsMessage message) {
        log.info("metadata: {}, paylod: {}", message.getMetadata(), message.getPayload());
    }
}
