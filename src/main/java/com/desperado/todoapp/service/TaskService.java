package com.desperado.todoapp.service;

import com.desperado.todoapp.model.Task;

import java.util.List;

public interface TaskService {

    List<Task> getAllTasks();

    Task update(Task task);

    Task create(Task task);

    void delete(Long id);

}
