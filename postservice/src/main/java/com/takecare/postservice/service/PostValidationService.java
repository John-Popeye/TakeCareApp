package com.takecare.postservice.service;

import com.takecare.postservice.model.AddressEmbeddable;
import com.takecare.postservice.model.Post;
import com.takecare.postservice.model.PostStatusEnum;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class PostValidationService {

    boolean validatePostOnCreation(Post post){
        return validatePostAddress(post.getAddress()) && validatePostStatus(post.getStatus());
    }

    boolean validatePostOnStatusChange(Post post, PostStatusEnum status){
        boolean isValid;
        switch (status){
            case open -> isValid = post.getStatus().equals(PostStatusEnum.assigned);
            case closed -> isValid = !post.getStatus().equals(PostStatusEnum.closed);
            case assigned -> isValid = post.getStatus().equals(PostStatusEnum.open);
            default -> isValid = false;
        }
        return isValid;
    }

    boolean isUserPostOwner(Post post, String username){
        return post.getCreatorUserName().equals(username);
    }

    private boolean validatePostAddress(AddressEmbeddable addressEmbeddable){
        return addressEmbeddable.getStreet().matches("^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9. ]+$") &&
        addressEmbeddable.getCity().matches("^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]+$") &&
        addressEmbeddable.getZipCode().matches("^[0-9]{2}-[0-9]{3}$") &&
        addressEmbeddable.getHomeNumber().matches("^[0-9]+[a-zA-Z]?$");
    }

    private boolean validatePostStatus(PostStatusEnum postStatus){
        return postStatus != null && Arrays.asList(PostStatusEnum.assigned, PostStatusEnum.closed, PostStatusEnum.open).contains(postStatus);
    }
}
