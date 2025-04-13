const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE email = ?`,
        [email],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static updatePassword(id, newPassword) {
    return new Promise(async (resolve, reject) => {
      try {
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        
        db.run(
          `UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
          [hashedPassword, id],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ changes: this.changes });
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM users WHERE id = ?`,
        [id],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static create(user) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) return reject(err);
        
        db.run(
          `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`,
          [user.name, user.email, hashedPassword, user.address, user.role || 'normal_user'],
          function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, ...user, password: undefined });
          }
        );
      });
    });
  }

  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  static getAll(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = `SELECT id, name, email, address, role, created_at FROM users`;
      const params = [];
      const conditions = [];

      if (filters.name) {
        conditions.push('name LIKE ?');
        params.push(`%${filters.name}%`);
      }

      if (filters.email) {
        conditions.push('email LIKE ?');
        params.push(`%${filters.email}%`);
      }

      if (filters.role) {
        conditions.push('role = ?');
        params.push(filters.role);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY name ASC';

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  static count() {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM users`,
        [],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        }
      );
    });
  }
}

module.exports = User;