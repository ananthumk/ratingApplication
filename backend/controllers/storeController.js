const Store = require('../models/store');

exports.createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json({ success: true, data: store });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.getAll(req.query);
    res.json({ success: true, data: stores });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStoreDetails = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getOwnerStore = async (req, res) => {
  try {
    const store = await Store.getByOwnerId(req.userId);
    if (!store) {
      return res.status(404).json({ success: false, message: 'No store found for this owner' });
    }

    const ratings = await Rating.getByStore(store.id);
    const averageRating = await Rating.getAverageRating(store.id);

    res.json({
      success: true,
      data: {
        store,
        ratings,
        average_rating: averageRating
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};