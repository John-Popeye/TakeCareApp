package com.takecare.notificationservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Notification {

    public Notification(String userName, Long postId, String type, NotificationStatusEnum status) {
        this.userName = userName;
        this.postId = postId;
        this.type = type;
        this.status = status;
    }

    @Id
    private String id;
    private String userName;
    private Long postId;
    private String type;
    private String creationDate;
    private NotificationStatusEnum status;
}
