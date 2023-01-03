package com.takecare.notificationservice.model;

public enum NotificationStatusEnum {
    checked, unchecked, archived;


    @Override
    public String toString() {
        return super.toString().toLowerCase();
    }
}
