-- Merkwave Database Setup Script
-- Run this in PostgreSQL (pgAdmin or psql)

-- Create database (run this first as postgres user)
-- CREATE DATABASE merkwave;

-- Connect to merkwave database, then run below:

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordhash TEXT NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    titleen VARCHAR(255) NOT NULL,
    titlear VARCHAR(255) NOT NULL,
    clientname VARCHAR(255) NOT NULL,
    projectdate TIMESTAMP NOT NULL,
    category INT NOT NULL,
    imageurl VARCHAR(500),
    demourl VARCHAR(500) NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    titleen VARCHAR(255) NOT NULL,
    titlear VARCHAR(255) NOT NULL,
    descriptionen TEXT NOT NULL,
    descriptionar TEXT NOT NULL,
    detaileddescriptionen TEXT,
    detaileddescriptionar TEXT,
    imageurl VARCHAR(500),
    creator VARCHAR(100) NOT NULL,
    blogdate TIMESTAMP NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clients table (contact inquiries)
CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_blogs_blogdate ON blogs(blogdate);
CREATE INDEX IF NOT EXISTS idx_clients_createdat ON clients(createdat);

-- Insert sample admin user (password: Admin@123)
-- Password hash is for "Admin@123" - change in production!
INSERT INTO users (username, email, passwordhash)
VALUES ('admin', 'admin@merkwave.com', '$2a$11$XxQHrVHKzJgZRN5PzBZoTuqyqVzG5nHLxKvQxFQKKvXxYvZvpL8V2')
ON CONFLICT (username) DO NOTHING;

SELECT 'Database setup complete!' as status;
