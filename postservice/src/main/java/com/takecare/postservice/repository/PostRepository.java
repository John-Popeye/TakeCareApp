package com.takecare.postservice.repository;

import com.takecare.postservice.model.Post;
import com.takecare.postservice.model.PostStatusEnum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.sql.Date;
import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long>, PagingAndSortingRepository<Post,Long> {
    @Query("SELECT u FROM Post u where u.status in (:statuses) and u.creatorUserName = :creatorUserName ORDER BY  u.creationDate DESC")
    List<Post> find5LatestJobsUserCreated(String creatorUserName, List<PostStatusEnum> statuses,Pageable pageable);

    @Query("SELECT u FROM Post u where u.status in (:statuses) and u.takerUserName = :userName ORDER BY  u.creationDate DESC")
    List<Post> find5LatestJobsUserIsAssignedTo(String userName, List<PostStatusEnum> statuses, Pageable pageable);

    List<Post> findAllByCreatorUserNameOrderByCreationDateDesc(String creatorUserName);

    List<Post> findAllByStatus(PostStatusEnum status, Pageable pageable);

    Page<Post> findByStatusAndStartDateBetweenAndEndDateBetweenOrderByCreationDateDesc(PostStatusEnum status, Date firstDate, Date secondDate, Date firstDateCopy, Date secondDateCopy, Pageable pageable);

    Page<Post> findByStatusAndAddress_CityAndStartDateBetweenAndEndDateBetweenOrderByCreationDateDesc(PostStatusEnum status,String city, Date startDate, Date endDate, Date startDateCopy, Date endDateCopy, Pageable pageable);

    Page<Post> findByStatusAndAddress_CityOrderByCreationDateDesc(PostStatusEnum status,String address_city, Pageable pageable);

    List<Post> findAllByTakerUserNameOrderByCreationDateDesc(String userName);

}
