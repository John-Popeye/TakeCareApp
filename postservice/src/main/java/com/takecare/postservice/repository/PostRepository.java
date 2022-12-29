package com.takecare.postservice.repository;

import com.takecare.postservice.model.Post;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long>, PagingAndSortingRepository<Post,Long> {

    List<Post> findTop5ByCreatorUserNameOrderByCreationDateDesc(String creatorUserName);

    List<Post> findTop5ByTakerUserNameOrderByCreationDateDesc(String creatorUserName);

    List<Post> findAllByCreatorUserNameOrderByCreationDateDesc(String creatorUserName);


}
