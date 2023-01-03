package com.takecare.postservice.model;

import lombok.*;

@Data
public class Notification {

    public Notification(String userName, Long postId, NotificationTypeEnum type, String creationDate , NotificationStatusEnum status) {
        this.userName = userName;
        this.postId = postId;
        this.type = type;
        this.creationDate = creationDate;
        this.status = status;
    }

    private String id;
    private String userName;
    private Long postId;
    private NotificationTypeEnum type;
    private String creationDate;
    private NotificationStatusEnum status;
}
