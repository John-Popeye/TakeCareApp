package com.takecare.notificationservice.repository;

import com.takecare.notificationservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {

    List<Notification> findByUserNameAndStatus(String username, String status);
    List<Notification> findByUserName(String username);
}
