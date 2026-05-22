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

-- Odoo Modules table
CREATE TABLE IF NOT EXISTS odoomodules (
    id SERIAL PRIMARY KEY,
    namear VARCHAR(255) NOT NULL,
    nameen VARCHAR(255) NOT NULL,
    descriptionar TEXT NOT NULL DEFAULT '',
    descriptionen TEXT NOT NULL DEFAULT '',
    detaileddescriptionar TEXT NOT NULL DEFAULT '',
    detaileddescriptionen TEXT NOT NULL DEFAULT '',
    imageurl VARCHAR(500) NOT NULL DEFAULT ''
);

-- Fleet table
CREATE TABLE IF NOT EXISTS fleets (
    id SERIAL PRIMARY KEY,
    nameen VARCHAR(255) NOT NULL,
    namear VARCHAR(255) NOT NULL,
    descriptionen TEXT NOT NULL,
    descriptionar TEXT NOT NULL,
    detaileddescriptionen TEXT,
    detaileddescriptionar TEXT,
    imageurl VARCHAR(500),
    model3durl VARCHAR(500),
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fleet features table
CREATE TABLE IF NOT EXISTS fleetfeatures (
    id SERIAL PRIMARY KEY,
    titleen VARCHAR(255) NOT NULL,
    titlear VARCHAR(255) NOT NULL,
    descriptionen TEXT NOT NULL,
    descriptionar TEXT NOT NULL,
    fleetid INT NOT NULL REFERENCES fleets(id) ON DELETE CASCADE
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    rating INT NOT NULL DEFAULT 5,
    texten TEXT NOT NULL,
    textar TEXT NOT NULL,
    clientnameen VARCHAR(255) NOT NULL,
    clientnamear VARCHAR(255) NOT NULL,
    clientpositionen VARCHAR(255) NOT NULL,
    clientpositionar VARCHAR(255) NOT NULL,
    avatar VARCHAR(10) NOT NULL DEFAULT ''
);

-- Brand Logos table
CREATE TABLE IF NOT EXISTS brandlogos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    alttext VARCHAR(500) NOT NULL DEFAULT '',
    imageurl VARCHAR(500) NOT NULL DEFAULT ''
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_blogs_blogdate ON blogs(blogdate);
CREATE INDEX IF NOT EXISTS idx_clients_createdat ON clients(createdat);

-- Seed admin user (password: Invalid username or password

)
INSERT INTO applicationusers (id, username, passwordhash)
VALUES (gen_random_uuid(), 'admin', '$2b$12$O6kUuXSVIvBZ51GRjbv9BuWv.MNEF3QwKQ.8p1jv0Pg9UcVaN0eQW')
ON CONFLICT (username) DO NOTHING;

SELECT 'Merkwave database initialized successfully!' AS status;
