package com.desperado.todoapp.repository;

import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceUtils;

import lombok.RequiredArgsConstructor;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
@RequiredArgsConstructor
public class DataSourceConfig {

    private final DataSource dataSource;

    public Connection getConnection() {
        return DataSourceUtils.getConnection(dataSource);
    }

}
