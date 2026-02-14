-- Merkwave Database Initialization Script
-- Runs automatically on first PostgreSQL container start

-- Users table (authentication) - matches ApplicationUser entity (Guid id)
CREATE TABLE IF NOT EXISTS applicationusers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    passwordhash TEXT NOT NULL
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_blogs_blogdate ON blogs(blogdate);
CREATE INDEX IF NOT EXISTS idx_clients_createdat ON clients(createdat);

-- Seed admin user (password: Admin@123)
INSERT INTO applicationusers (id, username, passwordhash)
VALUES (gen_random_uuid(), 'admin', '$2b$12$mQKWb9ha4z3h3i5oUwRU3.0tOvQ6WMsme7u/T3QbCtrFVH6S1hdMe')
ON CONFLICT (username) DO NOTHING;

SELECT 'Merkwave database initialized successfully!' AS status;
