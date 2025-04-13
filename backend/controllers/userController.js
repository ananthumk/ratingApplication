const User = require('../models/user');
const Store = require('../models/store');
const Rating = require('../models/rating');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Remove password from response
    const { password, ...userData } = user;
    
    // If user is store owner, add store info
    if (user.role === 'store_owner') {
      const store = await Store.getByOwnerId(user.id);
      if (store) {
        userData.store = store;
      }
    }
    
    res.json({ success: true, data: userData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll(req.query);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSystemStats = async (req, res) => {
  try {
    const [userCount, storeCount, ratingCount] = await Promise.all([
      User.count(),
      Store.count(),
      Rating.count()
    ]);
    
    res.json({ 
      success: true, 
      data: {
        users: userCount,
        stores: storeCount,
        ratings: ratingCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await User.verifyPassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    await User.updatePassword(user.id, newPassword);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.assignStoreOwner = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user role to store_owner
    db.run(
      `UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      ['store_owner', user.id],
      function(err) {
        if (err) throw err;
        res.json({ success: true, message: 'User assigned as store owner' });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let storeDetails = null;
    if (user.role === 'store_owner') {
      storeDetails = await Store.getByOwnerId(user.id);
    }

    res.json({ 
      success: true, 
      data: {
        user,
        store: storeDetails
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};