package com.dairydash.team.entity;
import jakarta.persistence.*;
@Entity @Table(name="team_members")
public class TeamMember {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String name;
 @Column(nullable=false,unique=true,length=190) private String email;
 @Column(nullable=false,length=30) private String role;
 protected TeamMember() {}
 public TeamMember(String name,String email,String role){this.name=name;this.email=email;this.role=role;}
 public Long getId(){return id;} public String getName(){return name;} public String getEmail(){return email;} public String getRole(){return role;}
 public void setName(String value){name=value;} public void setEmail(String value){email=value;} public void setRole(String value){role=value;}
}
