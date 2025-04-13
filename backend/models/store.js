const db = require('../config/database');

class Store {
  static create(store) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)`,
        [store.name, store.email, store.address, store.owner_id || null],
        function(err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, ...store });
        }
      );
    });
  }

  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT s.*, 
         (SELECT AVG(rating) FROM ratings WHERE store_id = s.id) as average_rating,
         (SELECT COUNT(*) FROM ratings WHERE store_id = s.id) as rating_count
         FROM stores s WHERE s.id = ?`,
        [id],
        (err, row) => {
          if (err) reject(err);
          else if (row) {
            row.average_rating = row.average_rating ? parseFloat(row.average_rating.toFixed(1)) : 0;
            resolve(row);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  static getByOwnerId(ownerId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM stores WHERE owner_id = ?`,
        [ownerId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });
  }

  static getAll(filters = {}) {
    return new Promise((resolve, reject) => {
      let query = `SELECT s.*, 
                  (SELECT AVG(rating) FROM ratings WHERE store_id = s.id) as average_rating,
                  (SELECT COUNT(*) FROM ratings WHERE store_id = s.id) as rating_count
                  FROM stores s`;
      const params = [];
      const conditions = [];

      if (filters.name) {
        conditions.push('s.name LIKE ?');
        params.push(`%${filters.name}%`);
      }

      if (filters.address) {
        conditions.push('s.address LIKE ?');
        params.push(`%${filters.address}%`);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY s.name ASC';

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows.map(row => ({
          ...row,
          average_rating: row.average_rating ? parseFloat(row.average_rating.toFixed(1)) : 0
        })));
      });
    });
  }

  static count() {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT COUNT(*) as count FROM stores`,
        [],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        }
      );
    });
  }
}

module.exports = Store;