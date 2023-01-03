package com.takecare.notificationservice.service;

import com.takecare.notificationservice.model.Notification;
import com.takecare.notificationservice.model.NotificationStatusEnum;
import com.takecare.notificationservice.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UcManageNotifications {

    @Autowired
    NotificationRepository notificationRepository;

    public List<Notification> getRecentNotificationsForUser(String username){
        return notificationRepository.findByUserNameAndStatus(username, NotificationStatusEnum.unchecked.toString());
    }

    public Notification addNotification(Notification notification){
        return notificationRepository.insert(notification);
    }

    public List<Notification> getAllNotificationsForUser(String username){
        return notificationRepository.findByUserName(username);
    }

    public Notification changeNotification(Notification notification){
        Optional<Notification> previousNotificationOptional = notificationRepository.findById(notification.getId());
        Notification previousNotification = previousNotificationOptional.orElseThrow(()-> new IllegalArgumentException("No object with id " + notification.getId() + "found"));
        NotificationStatusEnum previousStatus = previousNotification.getStatus();
        if(previousStatus.equals(NotificationStatusEnum.archived)){
            throw new IllegalArgumentException("Cannot change notification that is already archived");
        }
        if(notification.getStatus().equals(NotificationStatusEnum.checked) || notification.getStatus().equals(NotificationStatusEnum.unchecked) || notification.getStatus().equals(NotificationStatusEnum.archived)){
            return notificationRepository.save(notification);
        }
        throw new IllegalArgumentException("Cannot save notification");
    }
}
