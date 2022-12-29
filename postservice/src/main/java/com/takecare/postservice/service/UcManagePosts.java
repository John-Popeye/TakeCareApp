package com.takecare.postservice.service;

import com.takecare.postservice.model.Post;
import com.takecare.postservice.repository.PostRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import org.hibernate.ObjectNotFoundException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class UcManagePosts {

    @Inject
    PostRepository repository;

    public List<Post> findPostsForPage(int page){
        List<Post> returnPosts = repository.findAll(PageRequest.of(page-1, 10, Sort.by(Sort.Direction.DESC, "creationDate"))).getContent();
        returnPosts.forEach(post ->
        {
            if (post.getImage() != null && post.getImage().length > 0) {
                post.setBase64image(Base64.getEncoder().encodeToString(post.getImage()));
            }
        });
        return returnPosts;
    }

    public Post savePost(Post post, String username){
        String data = post.getBase64image();
        String partSeparator = ",";
        post.setCreatorUserName("John Doe");
        if (data.contains(partSeparator)) {
            String encodedImg = data.split(partSeparator)[1];
            post.setImage(Base64.getDecoder().decode(encodedImg.getBytes(StandardCharsets.UTF_8)));
        }
        post.setCreatorUserName(username);
        long millis=System.currentTimeMillis();
        post.setCreationDate(new Date(millis));
        post.setStatus("Open");
        Post returnPost =  repository.save(post);
        return returnPost;
    }

    public List<Post> findLatestCreatedPostsForUser(String username){
        return repository.findTop5ByCreatorUserNameOrderByCreationDateDesc(username);
    }
    public List<Post> findLatestAssignedPostsToUser(String username){
        return repository.findTop5ByTakerUserNameOrderByCreationDateDesc(username);
    }

    public List<Post> findAllPostsCreatedByUser(String username){
        return repository.findAllByCreatorUserNameOrderByCreationDateDesc(username);
    }

    public Post findPostById(String username, long id){
        Optional<Post> foundPost = repository.findById(id);
        return foundPost.orElseThrow(() -> new IllegalArgumentException("Post with given id does not exist"));

    }

}
