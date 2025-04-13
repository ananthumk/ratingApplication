const Rating = require('../models/rating');

exports.submitRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;
    const ratingObj = await Rating.submit(req.userId, store_id, rating);
    res.json({ success: true, data: ratingObj });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getUserRatings = async (req, res) => {
  try {
    const ratings = await Rating.getByUser(req.userId);
    res.json({ success: true, data: ratings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const ratings = await Rating.getByStore(req.params.storeId);
    const average = await Rating.getAverageRating(req.params.storeId);
    res.json({ 
      success: true, 
      data: {
        ratings,
        average_rating: average
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};