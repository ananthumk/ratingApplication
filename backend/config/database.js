const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const dbDir = path.resolve(__dirname, '../db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.resolve(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK(length(name) >= 20 AND length(name) <= 60),
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      address TEXT CHECK(length(address) <= 400),
      role TEXT NOT NULL DEFAULT 'normal_user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create stores table
  db.run(`
    CREATE TABLE IF NOT EXISTS stores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL CHECK(length(name) <= 100),
      email TEXT NOT NULL UNIQUE,
      address TEXT NOT NULL CHECK(length(address) <= 400),
      owner_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )
  `);

  // Create ratings table
  db.run(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      store_id INTEGER NOT NULL,
      rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (store_id) REFERENCES stores(id),
      UNIQUE(user_id, store_id)
    )
  `);

  // Create default admin user
  db.get("SELECT COUNT(*) AS count FROM users WHERE role = 'system_admin'", (err, row) => {
    if (err) console.error('Error checking admin user:', err);
    else if (row.count === 0) {
      const hashedPassword = bcrypt.hashSync('Admin@123', 10);
      db.run(
        `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
        ['System Administrator', 'admin@storerating.com', hashedPassword, 'System Address', 'system_admin'],
        (err) => {
          if (err) console.error('Error creating admin user:', err);
          else console.log('Default admin user created');
        }
      );
    }
  });
});

module.exports = db;