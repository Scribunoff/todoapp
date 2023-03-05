package com.desperado.todoapp.repository.mapper;

import com.desperado.todoapp.model.Status;
import com.desperado.todoapp.model.Task;

import lombok.SneakyThrows;

import javax.swing.tree.RowMapper;
import javax.swing.tree.TreePath;
import java.util.ArrayList;
import java.util.List;

import java.sql.ResultSet;



public class TaskRowMapper {

    @SneakyThrows
    public static List<Task> mapRows(ResultSet resultSet) {
        List<Task> taskList = new ArrayList<>();
        while (resultSet.next()) {
            Task task = new Task();
            task.setId(resultSet.getLong("id"));

            if (!resultSet.wasNull()) {
                task.setTitle(resultSet.getString("title"));
                task.setMark(resultSet.getString("mark"));
                task.setDescription(resultSet.getString("description"));
                task.setStatus(Status.valueOf(resultSet.getString("status")));
                taskList.add(task);
            }
        }
        return taskList;
    }


}
