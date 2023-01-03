package com.takecare.postservice.controler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.takecare.postservice.controller.PostController;
import com.takecare.postservice.model.FilterObject;
import com.takecare.postservice.model.Post;
import com.takecare.postservice.service.UcManagePosts;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PostController.class)
@AutoConfigureMockMvc(addFilters = false)
public class PostControllerUnitTest {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UcManagePosts postService;

    @MockBean
    SecurityContext securityContext;

    @Test
    public void getPostsPageShouldReturnPageablePostsWithFilter() throws Exception {
        Post post = new Post();
        post.setTitle("test");
        List<Post> allPosts = List.of(post);
        FilterObject filter = new FilterObject();
        Mockito.when(postService.findPostsForPage(anyInt(), any(FilterObject.class))).thenReturn(allPosts);
        this.mockMvc.perform(post("/v1/posts/page/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(String.valueOf(asJsonString(filter))))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].title").exists());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}


