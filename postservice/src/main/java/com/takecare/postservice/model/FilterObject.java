package com.takecare.postservice.model;


import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class FilterObject {
    String city;
    Date startDate;
    Date endDate;
}
