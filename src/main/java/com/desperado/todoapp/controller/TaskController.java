package com.desperado.todoapp.controller;

import com.desperado.todoapp.model.Task;
import com.desperado.todoapp.service.TaskService;
import com.desperado.todoapp.validation.OnCreate;
import com.desperado.todoapp.validation.OnUpdate;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Validated
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<Task> getAllItems() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task create(@Validated(OnCreate.class) @RequestBody Task task) {
        return taskService.create(task);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        taskService.delete(id);
    }

    @PutMapping
    public Task update(@Validated(OnUpdate.class) @RequestBody Task newTask) {
        return taskService.update(newTask);
    }

}
