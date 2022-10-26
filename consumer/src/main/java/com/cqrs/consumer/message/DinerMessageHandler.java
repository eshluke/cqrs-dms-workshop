package com.cqrs.consumer.message;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DinerMessageHandler {

    @KafkaListener(topics = {"${kafka.topic.diner}"})
    public void onMessage(DmsMessage message) {
        log.info("metadata: {}, paylod: {}", message.getMetadata(), message.getPayload());
        // 메세지 타입 분류하여 적절한 핸들러에 위임 (Full Load vs CDC)
        // Full Load 의 경우: CREATE-TABLE 과 DROP-TABLE 타입
        //   --> 예: Full Load 메세지가 들어온 경우 시스템을 종료한다 (예외)
        // CDC 의 경우: INSERT, UPDATE, DELETE 타입 핸들링
        //   --> 예: 1. 계약 아이디를 꺼낸다.
        //          2. 조회 모델을 구성하기 위해 Target DB 의 원본 테이블들을 Join 하여 조회한다.
        //          3. 이를 Target DB 의 조회 모델에 저장한다.
    }
}
