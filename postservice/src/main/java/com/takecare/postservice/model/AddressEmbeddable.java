package com.takecare.postservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Table(name = "address")
public class AddressEmbeddable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String city;
    private String zipCode;
    private String street;
    private String homeNumber;
    private String flatNumber;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressEmbeddable that = (AddressEmbeddable) o;
        return Objects.equals(id, that.id) && Objects.equals(city, that.city) && Objects.equals(zipCode, that.zipCode) && Objects.equals(street, that.street) && Objects.equals(homeNumber, that.homeNumber) && Objects.equals(flatNumber, that.flatNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, city, zipCode, street, homeNumber, flatNumber);
    }
}
