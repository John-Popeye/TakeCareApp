package com.takecare.postservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name= "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Date startDate;
    private Date endDate;
    private Date creationDate;
    private String status;
    private String animalDescription;
    private String creatorUserName;
    private String takerUserName;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    @Transient
    private String base64image;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private AddressEmbeddable address;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) && Objects.equals(title, post.title) && Objects.equals(description, post.description) && Objects.equals(startDate, post.startDate) && Objects.equals(endDate, post.endDate) && Objects.equals(creationDate, post.creationDate) && Objects.equals(status, post.status) && Objects.equals(animalDescription, post.animalDescription);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, startDate, endDate, creationDate, status, animalDescription);
    }
}
