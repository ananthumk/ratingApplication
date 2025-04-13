const db = require('../config/database');

class Rating {
  static submit(userId, storeId, rating) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR REPLACE INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)`,
        [userId, storeId, rating],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, user_id: userId, store_id: storeId, rating });
        }
      );
    });
  }

  static getByUser(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT r.*, s.name as store_name 
         FROM ratings r JOIN stores s ON r.store_id = s.id 
         WHERE r.user_id = ?`,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static getByStore(storeId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT r.*, u.name as user_name 
         FROM ratings r JOIN users u ON r.user_id = u.id 
         WHERE r.store_id = ?`,
        [storeId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static getAverageRating(storeId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT AVG(rating) as average FROM ratings WHERE store_id = ?`,
        [storeId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.average ? parseFloat(row.average.toFixed(1)) : 0);
        }
      );
    });
  }

  static count() {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM ratings`,
        [],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        }
      );
    });
  }
}

module.exports = Rating;