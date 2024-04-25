package com.example.oblig3;


import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class TicketModel {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "film_name")
    private String filmname;

    @Column(name = "quantity")
    private long quantity;

    @Column(name = "first_name")
    private String firstname;

    @Column(name = "last_name")
    private String lastname;

    @Column(name = "phone_number")
    private String phonenumber;

    @Column(name = "email")
    private String email;

    public TicketModel() {

    }

    public TicketModel(String filmname, long quantity, String firstname, String lastname, String phonenumber, String email) {
        this.filmname = filmname;
        this.quantity = quantity;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.email = email;
    }

    public long getId() {
        return id;
    }
    public long getQuantity() {
        return quantity;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public String getFilmname() {
        return filmname;
    }
    public String getEmail() {
        return email;
    }
    public String getPhonenumber() {
        return phonenumber;
    }

    @Override
    public String toString() {
        return "Ticket [quantity=" + quantity + ", film_name=" + filmname + " first_name=" + firstname + ", phone_number ="+phonenumber+", email ="+email+"] ";
    }
}
