package com.desperado.todoapp.model;

import com.desperado.todoapp.validation.*;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
public class Task {

    @NotNull(message = "Id must be not null", groups = OnUpdate.class)
    private Long id;

    @NotNull(message = "Title must be not null", groups = {OnUpdate.class, OnCreate.class})
    @Length(max=255, message = "Title length must be smaller than 255 symbols", groups = {OnCreate.class, OnUpdate.class})
    private String title;

    @Length(max=255, message = "Title length must be smaller than 255 symbols", groups = {OnCreate.class, OnUpdate.class})
    private String description;

    private Status status;

    @Length(max=255, message = "Title length must be smaller than 255 symbols", groups = {OnCreate.class, OnUpdate.class})
    private String mark;

//    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
//    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
//    private LocalDateTime expirationDate;

}
