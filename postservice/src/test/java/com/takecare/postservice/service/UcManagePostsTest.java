package com.takecare.postservice.service;

import com.takecare.postservice.model.FilterObject;
import com.takecare.postservice.model.Post;
import com.takecare.postservice.model.PostStatusEnum;
import com.takecare.postservice.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.data.domain.*;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;

@ExtendWith(SpringExtension.class)
public class UcManagePostsTest {

    private UcManagePosts service;

    @BeforeEach
    void setup() {
        service = new UcManagePosts();
        service.repository = Mockito.mock(PostRepository.class);
        service.validationService = Mockito.mock(PostValidationService.class);
        service.restTemplate = Mockito.mock(RestTemplate.class);
    }

    @Test
    public void shouldFindPostsForPageTest() {
        FilterObject filterObject = new FilterObject();
        filterObject.setCity("Wrocław");
        filterObject.setStartDate(new Date(System.currentTimeMillis()));
        filterObject.setEndDate(new Date(System.currentTimeMillis()));

        int page = 1;

        Post post = new Post();
        post.setTitle("test");
        List<Post> allPosts = List.of(post);

        Page<Post> pagedResponse = new PageImpl(allPosts);

        Pageable pageRequest = PageRequest.of(0, 10);


        Mockito.when(
                service.repository
                        .findByStatusAndAddress_CityAndStartDateBetweenAndEndDateBetweenOrderByCreationDateDesc
                                (PostStatusEnum.open, filterObject.getCity(), filterObject.getStartDate(),
                                        filterObject.getEndDate(), filterObject.getStartDate(),
                                        filterObject.getEndDate(), pageRequest)).thenReturn(pagedResponse);

        List<Post> result = service.findPostsForPage(page, filterObject);

        assertEquals(result, allPosts);
    }

    @Test
    public void shouldFindPostsForPageTestWhenFilterIsEmpty() {
        FilterObject filterObject = new FilterObject();
        filterObject.setCity("");

        int page = 1;

        Post post = new Post();
        post.setTitle("test");
        List<Post> allPosts = List.of(post);

        Pageable pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "creationDate"));

        Mockito.when(
                service.repository
                        .findAllByStatus
                                (PostStatusEnum.open, pageRequest)).thenReturn(allPosts);

        List<Post> result = service.findPostsForPage(page, filterObject);

        assertEquals(result, allPosts);
    }


    @Test
    public void shouldChangePostStatusTest() {
        String username = "user";
        String token = "JWTTOKEN";
        long id = 1;

        Post post = new Post();
        post.setTitle("test");
        post.setCreatorUserName("testusername");


        Mockito.when(service.validationService
                        .validatePostOnStatusChange(any(Post.class), any(PostStatusEnum.class)))
                .thenReturn(true);

        Mockito.when(
                service.repository
                        .findById
                                (anyLong())).thenReturn(Optional.of(post));

        service.changePostStatus(username, id, token, PostStatusEnum.open);
        post.setStatus(PostStatusEnum.open);
        Mockito.verify(service.restTemplate, times(1));


    }

}
