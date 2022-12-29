package com.takecare.postservice.controller;

import com.takecare.postservice.model.Post;
import com.takecare.postservice.service.UcManagePosts;
import jakarta.inject.Inject;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="v1/posts")
public class PostController {

    @Inject
    UcManagePosts ucManagePosts;

    @GetMapping(value="/page/{pageNumber}")
    public List<Post> getPostsPage (@PathVariable("pageNumber") int pageNumber){
        return ucManagePosts.findPostsForPage(pageNumber);
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

    @GetMapping(value="/post/{id}")
    public Post getAllPostsCreatedByUser (@PathVariable int id, @AuthenticationPrincipal Jwt principal){
        String username =  principal.getClaim("preferred_username");
        return ucManagePosts.findPostById(username, id);
    }
}
