package com.takecare.notificationservice.controller;

import com.takecare.notificationservice.model.Notification;
import com.takecare.notificationservice.service.UcManageNotifications;
import jakarta.inject.Inject;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="v1/notifications")
public class NotificationController {

    @Inject
    UcManageNotifications ucManageNotifications;

    @GetMapping(value="/get/uncheked")
    public List<Notification> getUnchekedNotificationsForUser (@AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManageNotifications.getRecentNotificationsForUser(username);
    }

    @GetMapping(value="/get/all")
    public List<Notification> getAllNotificationsForUser (@AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManageNotifications.getAllNotificationsForUser(username);
    }

    @PostMapping(value="/add/{username}")
    public Notification addNotificationToUser (@RequestBody Notification notification, @PathVariable("username") String username){
        return ucManageNotifications.addNotification(notification);
    }

    @PostMapping(value="/change")
    public Notification changeNotificationStatus (@RequestBody Notification notification){
        return ucManageNotifications.changeNotification(notification);
    }
}
