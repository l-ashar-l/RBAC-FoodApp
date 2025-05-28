const Restaurant = require('../models/Restaurant');

exports.getRestaurants = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { country: req.user.country };
    const restaurants = await Restaurant.find(filter);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    if (req.user.role !== 'admin' && restaurant.country !== req.user.country) {
      return res.status(403).json({ 
        message: 'Forbidden: Access to resources outside your country is restricted' 
      });
    }
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addRestaurant = async (req, res) => {
  try {
    const { name, country, menu } = req.body;
    
    const restaurant = new Restaurant({
      name,
      country,
      menu
    });
    
    const createdRestaurant = await restaurant.save();
    res.status(201).json(createdRestaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};