package com.takecare.postservice.service;

import com.takecare.postservice.model.*;
import com.takecare.postservice.repository.PostRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.*;

@Transactional
@Service
public class UcManagePosts {

    @Inject
    PostRepository repository;

    @Inject
    PostValidationService validationService;


    public List<Post> findLatestCreatedPostsForUser(String username){
        return repository.find5LatestJobsUserCreated(username, Arrays.asList(PostStatusEnum.open, PostStatusEnum.assigned), PageRequest.of(0,5));
    }
    public List<Post> findLatestAssignedPostsToUser(String username){
        return repository.find5LatestJobsUserIsAssignedTo(username, Arrays.asList(PostStatusEnum.open, PostStatusEnum.assigned),  PageRequest.of(0,5));
    }
    public List<Post> findAllPostsCreatedByUser(String username){return repository.findAllByCreatorUserNameOrderByCreationDateDesc(username);}
    public List<Post> findAllJobsAssignedToUser(String username) {return repository.findAllByTakerUserNameOrderByCreationDateDesc(username);}

    public List<Post> findPostsForPage(int page, FilterObject filterObject){
        if(filterObject.getCity() != null && filterObject.getCity().equals("")){
            filterObject.setCity(null);
        }
        Pageable paging = PageRequest.of(page-1, 10);
        if(filterObject.getCity() == null && filterObject.getStartDate() == null && filterObject.getEndDate() == null){
            List<Post> returnPosts = repository.findAllByStatus(PostStatusEnum.open, PageRequest.of(page-1, 10, Sort.by(Sort.Direction.DESC, "creationDate")));
            returnPosts.forEach(this::handleImageFileDecoding);
            return returnPosts;
        }
        if(filterObject.getCity() != null && filterObject.getStartDate() != null && filterObject.getEndDate() != null){
            List<Post> returnPosts = repository
                    .findByStatusAndAddress_CityAndStartDateBetweenAndEndDateBetweenOrderByCreationDateDesc(
                            PostStatusEnum.open,
                            filterObject.getCity(),
                            filterObject.getStartDate(),
                            filterObject.getEndDate(),
                            filterObject.getStartDate(),
                            filterObject.getEndDate(),
                            paging).toList();
            returnPosts.forEach(this::handleImageFileDecoding);
            return returnPosts;
        }
        if(filterObject.getStartDate() != null && filterObject.getEndDate() != null){
            List<Post> returnPosts = repository
                    .findByStatusAndStartDateBetweenAndEndDateBetweenOrderByCreationDateDesc(
                            PostStatusEnum.open,
                            filterObject.getStartDate(),
                            filterObject.getEndDate(),
                            filterObject.getStartDate(),
                            filterObject.getEndDate(),
                            paging).toList();
            returnPosts.forEach(this::handleImageFileDecoding);
            return returnPosts;
        }
        if(filterObject.getCity() != null){
            List<Post> returnPosts = repository
                    .findByStatusAndAddress_CityOrderByCreationDateDesc(
                            PostStatusEnum.open,
                            filterObject.getCity(),
                            paging).toList();
            returnPosts.forEach(this::handleImageFileDecoding);
            return returnPosts;
        }

        return new ArrayList<>();

    }

    public Post savePost(Post post, String username){
        handleImageFileSave(post);

        post.setCreatorUserName(username);
        post.setCreationDate(new Timestamp(System.currentTimeMillis()));
        post.setStatus(PostStatusEnum.open);

        if(!validationService.validatePostOnCreation(post)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Object did not pass required validation");
        }

        return repository.save(post);
    }

    public Post findPostById( long id){
        Optional<Post> foundPost = repository.findById(id);
        return foundPost.map(post -> {
            if (post.getImage() != null && post.getImage().length > 0) {
                post.setBase64image(Base64.getEncoder().encodeToString(post.getImage()));
            }
            return post;
        }).orElseThrow(() -> new IllegalArgumentException("Post with given id does not exist"));

    }

    public Post changePostStatus(String username, long id, String token, PostStatusEnum status){
        Post post = findPostById(id);
        if(!validationService.validatePostOnStatusChange(post, status)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Object did not pass required validation for status");
        }

        if(validationService.isUserPostOwner(post, username) && status.equals(PostStatusEnum.assigned)){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "You cant assign yourself to your post"
            );
        }
        if(status.equals(PostStatusEnum.assigned) && post.getTakerUserName() != null){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This post is already assigned to user"
            );
        }
        if(status.equals(PostStatusEnum.assigned)){
            post.setTakerUserName(username);
        }
        post.setStatus(status);

        switch (status){
            case open -> addNotification(token, id, NotificationTypeEnum.canceled, post.getCreatorUserName());
            case closed -> addNotification(token, id, NotificationTypeEnum.closed, post.getTakerUserName());
            case assigned -> addNotification(token, id, NotificationTypeEnum.added, post.getCreatorUserName());
        }
        return repository.save(post);
    }

    public void addNotification(String token, long postId, NotificationTypeEnum type, String username){
        RestTemplate restTemplate = new RestTemplate();
        String notificationServer = "http://localhost:8091/v1/notifications/add/" + username;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String fullHeaderValue = "Bearer " + token;
        headers.add("Authorization",
                fullHeaderValue);
        HttpEntity<Notification> request =
                new HttpEntity<>(new Notification(username, postId, type, new Timestamp(System.currentTimeMillis()).toString(), NotificationStatusEnum.unchecked), headers);
        restTemplate.postForLocation(notificationServer, request);
    }

    private void handleImageFileSave(Post post){
        String data = post.getBase64image();
        String partSeparator = ",";
        if (data != null && data.contains(partSeparator)) {
            String encodedImg = data.split(partSeparator)[1];
            post.setImage(Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8)));
        }

    }

    private void handleImageFileDecoding(Post post){
        if (post.getImage() != null && post.getImage().length > 0) {
            post.setBase64image(Base64.getEncoder().encodeToString(post.getImage()));
        }
    }

}
