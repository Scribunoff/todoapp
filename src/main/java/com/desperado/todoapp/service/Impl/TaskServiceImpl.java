package com.desperado.todoapp.service.Impl;

import com.desperado.todoapp.model.Status;
import com.desperado.todoapp.model.Task;
import com.desperado.todoapp.repository.TaskRepository;
import com.desperado.todoapp.service.TaskService;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        return taskRepository.findAllTasks();
    }

    @Override
    @Transactional
    public Task update(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(Status.TODO);
        }
        taskRepository.update(task);
        return task;
    }

    @Override
    @Transactional
    public Task create(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(Status.TODO);
        }
        taskRepository.create(task);
        return task;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        taskRepository.delete(id);
    }
}
