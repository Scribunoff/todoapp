package com.desperado.todoapp.controller;

import com.desperado.todoapp.model.Task;
import com.desperado.todoapp.service.TaskService;
import com.desperado.todoapp.validation.OnCreate;
import com.desperado.todoapp.validation.OnUpdate;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Validated
@Tag(name="Task Controller", description = "Task List API")
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    @Operation(summary = "Get all tasks")
    public List<Task> getAllItems() {
        return taskService.getAllTasks();
    }

    @PostMapping
    @Operation(summary = "Create task")
    public Task create(@Validated(OnCreate.class) @RequestBody Task task) {
        return taskService.create(task);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete task by id")
    public void deleteById(@PathVariable Long id) {
        taskService.delete(id);
    }

    @PutMapping
    @Operation(summary = "Update task")
    public Task update(@Validated(OnUpdate.class) @RequestBody Task newTask) {
        return taskService.update(newTask);
    }

}
