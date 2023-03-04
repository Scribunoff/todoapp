CREATE SCHEMA IF NOT EXISTS todoApp;

CREATE TABLE IF NOT EXISTS tasks
(
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    status VARCHAR(255) NOT NULL,
    mark VARCHAR(255) NULL
--    expiration_date TIMESTAMP NULL
);