const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: {
    type: String,
    required: true,
    enum: ['India', 'America']
  },
  menu: [menuItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);