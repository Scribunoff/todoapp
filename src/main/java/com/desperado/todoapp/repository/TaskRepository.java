package com.desperado.todoapp.repository;

import com.desperado.todoapp.model.Task;

import java.util.List;

public interface TaskRepository {

    List<Task> findAllTasks();

    void update(Task task);

    void create(Task task);

    void delete(Long id);
}
