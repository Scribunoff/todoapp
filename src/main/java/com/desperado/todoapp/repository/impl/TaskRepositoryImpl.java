package com.desperado.todoapp.repository.impl;

import com.desperado.todoapp.model.Task;
import com.desperado.todoapp.repository.DataSourceConfig;
import com.desperado.todoapp.repository.TaskRepository;
import com.desperado.todoapp.repository.mapper.TaskRowMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.List;


@Repository
@RequiredArgsConstructor
public class TaskRepositoryImpl implements TaskRepository {

    private final DataSourceConfig dataSourceConfig;

    private final String FIND_ALL_TASKS = """
            SELECT *
            FROM tasks
            """;

    private final String DELETE = """
            DELETE FROM tasks
            WHERE id = ?
            """;

    private final String UPDATE = """
            UPDATE tasks
            SET title = ?,
                description = ?,
                mark = ?,
                status = ?
            WHERE id = ?
            """;

    private final String CREATE = """
            INSERT INTO tasks (title, description, mark, status)
            VALUES (?,?,?,?)
            """;



    @Override
    public List<Task> findAllTasks() {
        try {
            Connection connection = dataSourceConfig.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(FIND_ALL_TASKS);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                return TaskRowMapper.mapRows(resultSet);
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error while finding tasks");
        }
    }

    @Override
    public void update(Task task) {
        try {
            Connection connection = dataSourceConfig.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(UPDATE);

            preparedStatement.setString(1, task.getTitle());

            if (task.getDescription() == null) {
                preparedStatement.setNull(2, Types.VARCHAR);
            } else {
                preparedStatement.setString(2, task.getDescription());
            }

            if (task.getMark() == null) {
                preparedStatement.setNull(3, Types.VARCHAR);
            } else {
                preparedStatement.setString(3, task.getMark());
            }

            preparedStatement.setString(4, task.getStatus().toString());

//            if (task.getExpirationDate() == null) {
//                preparedStatement.setNull(5, Types.TIMESTAMP);
//            } else {
//                preparedStatement.setTimestamp(5, Timestamp.valueOf(task.getExpirationDate()));
//            }


            preparedStatement.setLong(5, task.getId());

            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Error while updating task");
        }

    }

    @Override
    public void create(Task task) {
        try {
            Connection connection = dataSourceConfig.getConnection();
            PreparedStatement preparedStatement = connection
                    .prepareStatement(CREATE, PreparedStatement.RETURN_GENERATED_KEYS);

            preparedStatement.setString(1, task.getTitle());

            if (task.getDescription() == null) {
                preparedStatement.setNull(2, Types.VARCHAR);
            } else {
                preparedStatement.setString(2, task.getDescription());
            }

            if (task.getMark() == null) {
                preparedStatement.setNull(3, Types.VARCHAR);
            } else {
                preparedStatement.setString(3, task.getMark());
            }

            preparedStatement.setString(4, task.getStatus().name());

//            if (task.getExpirationDate() == null) {
//                preparedStatement.setNull(5, Types.TIMESTAMP);
//            } else {
//                preparedStatement.setTimestamp(5, Timestamp.valueOf(task.getExpirationDate()));
//            }

            preparedStatement.executeUpdate();

            try (ResultSet rs = preparedStatement.getGeneratedKeys()) {
                rs.next();
                task.setId(rs.getLong(1));
            }

        } catch (SQLException e) {
            throw new RuntimeException("Error while creating task");
        }

    }

    @Override
    public void delete(Long id) {
        try {
            Connection connection = dataSourceConfig.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(DELETE);
            preparedStatement.setLong(1, id);
            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Error while deleting task");
        }
    }
}
