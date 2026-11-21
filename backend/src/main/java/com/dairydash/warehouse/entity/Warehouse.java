package com.dairydash.warehouse.entity;
import jakarta.persistence.*;
@Entity @Table(name="warehouses")
public class Warehouse {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String name;
 @Column(length=250) private String location;
 protected Warehouse() {}
 public Warehouse(String name,String location){this.name=name;this.location=location;}
 public Long getId(){return id;} public String getName(){return name;} public String getLocation(){return location;}
 public void setName(String value){name=value;} public void setLocation(String value){location=value;}
}
