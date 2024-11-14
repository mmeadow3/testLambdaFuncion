-- This is a comment in a SQL script
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');

SELECT * FROM users;


-- Then run : psql -U postgres -h localhost -d your_database_name -f path_to_script.sql

