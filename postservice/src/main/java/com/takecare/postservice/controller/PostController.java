package com.takecare.postservice.controller;

import com.takecare.postservice.model.FilterObject;
import com.takecare.postservice.model.Post;
import com.takecare.postservice.model.PostStatusEnum;
import com.takecare.postservice.service.UcManagePosts;
import jakarta.inject.Inject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value="v1/posts")
public class PostController {

    @Inject
    UcManagePosts ucManagePosts;

    @PostMapping(value="/page/{pageNumber}")
    public List<Post> getPostsPage (@PathVariable("pageNumber") int pageNumber, @RequestBody FilterObject filterObject){
        return ucManagePosts.findPostsForPage(pageNumber, filterObject);
    }

    @PostMapping(value="/create")
    public Post savePost (@RequestBody Post post, @AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.savePost(post, username);
    }

    @GetMapping(value="/last-created")
    public List<Post> getLatestsPostsCreatedByUser (@AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.findLatestCreatedPostsForUser(username);
    }
    @GetMapping(value="/last-assigned")
    public List<Post> getLatestsPostsAssignedToUser (@AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.findLatestAssignedPostsToUser(username);
    }

    @GetMapping(value="/all-user-created")
    public List<Post> getAllPostsCreatedByUser (@AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.findAllPostsCreatedByUser(username);
    }

    @GetMapping(value="/all-user-jobs")
    public List<Post> getAllJobsForUser (@AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.findAllJobsAssignedToUser(username);
    }

    @GetMapping(value="/post/{id}")
    public Post getAllPostsCreatedByUser (@PathVariable int id){
        return ucManagePosts.findPostById(id);
    }

    @PostMapping(value="/post/{id}/assign")
    public Post assignUserToPost (@PathVariable int id, @AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.changePostStatus(username, id, principal.getTokenValue(), PostStatusEnum.assigned);
    }

    @PostMapping(value="/post/{id}/cancel")
    public Post cancelUserAssignemtToPost (@PathVariable int id, @AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.changePostStatus(username, id, principal.getTokenValue(), PostStatusEnum.open);
    }

    @PostMapping(value="/post/{id}/close")
    public Post closePost (@PathVariable int id, @AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.changePostStatus(username, id, principal.getTokenValue(), PostStatusEnum.closed);
    }
}
