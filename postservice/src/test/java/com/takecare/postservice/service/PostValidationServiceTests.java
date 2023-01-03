package com.takecare.postservice.service;

import com.takecare.postservice.model.AddressEmbeddable;
import com.takecare.postservice.model.Post;
import com.takecare.postservice.model.PostStatusEnum;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class PostValidationServiceTests {


    private final PostValidationService service = new PostValidationService();


    @Test
    public void testValidatePostOnCreation() {
        // Test with valid post address and status
        Post post = new Post();
        post.setAddress(new AddressEmbeddable(123L, "Wrocław","52-131", "123 Main St", "12a", "11"));
        post.setStatus(PostStatusEnum.open);
        boolean result = service.validatePostOnCreation(post);
        assertTrue(result);

        // Test with invalid post address
        post = new Post();
        post.setAddress(new AddressEmbeddable(123L, "Wrocław","52x-131", "123 Main St", "asvb12a", "11f"));
        post.setStatus(PostStatusEnum.open);
        result = service.validatePostOnCreation(post);
        assertFalse(result);

        // Test with invalid post status
        post = new Post();
        post.setAddress(new AddressEmbeddable(123L, "Wrocław","52-131", "123 Main St", "12a", "11"));
        post.setStatus(null);
        result = service.validatePostOnCreation(post);
        assertFalse(result);
    }

    @Test
    public void testValidatePostOnStatusChange() {
        // Test with valid status change from 'open' to 'assigned'
        Post post = new Post();
        post.setStatus(PostStatusEnum.open);
        boolean result = service.validatePostOnStatusChange(post, PostStatusEnum.assigned);
        assertTrue(result);

        // Test with invalid status change from 'closed' to 'closed'
        post = new Post();
        post.setStatus(PostStatusEnum.closed);
        result = service.validatePostOnStatusChange(post, PostStatusEnum.closed);
        assertFalse(result);

        // Test with valid status change from 'assigned' to 'open'
        post = new Post();
        post.setStatus(PostStatusEnum.assigned);
        result = service.validatePostOnStatusChange(post, PostStatusEnum.open);
        assertTrue(result);
    }

    @Test
    public void testIsUserPostOwner() {
        // Test with valid post owner
        Post post = new Post();
        post.setCreatorUserName("user1");
        boolean result = service.isUserPostOwner(post, "user1");
        assertTrue(result);

        // Test with invalid post owner
        post = new Post();
        post.setCreatorUserName("user1");
        result = service.isUserPostOwner(post, "user2");
        assertFalse(result);
    }




}
