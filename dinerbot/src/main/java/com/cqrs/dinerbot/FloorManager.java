package com.cqrs.dinerbot;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class FloorManager {

    private final DinerBot bot;
    private final long delayBetweenTasks;

    public FloorManager(DinerBot bot,
                        @Value("${scheduler.task.fixedDelayMs}") long delayBetweenTasks) {
        this.bot = bot;
        this.delayBetweenTasks = delayBetweenTasks;
    }

    @Scheduled(fixedDelayString ="${scheduler.worker.fixedDelayMs}", initialDelayString = "${scheduler.worker.initialDelayMs}")
    public void scheduleBot() throws InterruptedException {
        Long orderId = bot.receiveOrder();

        TimeUnit.MILLISECONDS.sleep(delayBetweenTasks);
        bot.finishCooking(orderId);

        TimeUnit.MILLISECONDS.sleep(delayBetweenTasks);
        bot.startDelivery(orderId);

        TimeUnit.MILLISECONDS.sleep(delayBetweenTasks);
        bot.finishDelivery(orderId);
    }
}
