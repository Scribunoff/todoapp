package com.desperado.todoapp.model;

import com.desperado.todoapp.validation.*;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Schema(description = "Task Model")
public class Task {

    @Schema(description = "Task Id", example = "1")
    @NotNull(message = "Id must be not null", groups = OnUpdate.class)
    private Long id;

    @Schema(description ="Title of the task", example = "Buy car")
    @NotNull(message = "Title must be not null", groups = {OnUpdate.class, OnCreate.class})
    @Length(max=255, message = "Title length must be smaller than 255 symbols", groups = {OnCreate.class, OnUpdate.class})
    private String title;

    @Schema(description = "Description of the task", example = "buy a car after passing on a driver's license")
    @Length(max=255, message = "Title length must be smaller than 255 symbols", groups = {OnCreate.class, OnUpdate.class})
    private String description;

    @Schema(description = "Type of the task", example = "DREAM")
    private Status status;

    @Schema(description = "Some notes on the task", example = "Buy until 2030")
    @Length(max=255, message = "Title length must be smaller than 255 symbols", groups = {OnCreate.class, OnUpdate.class})
    private String mark;


}
