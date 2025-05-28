const express = require('express');
const { 
  getRestaurants, 
  getRestaurantById, 
  addRestaurant
} = require('../controllers/restaurantController');
const protect = require('../middleware/auth');
const { checkPermission } = require('../middleware/rbac');
const { PERMISSIONS } = require('../config/roles');

const router = express.Router();

router.get('/', protect, getRestaurants);
router.get('/:id', protect, getRestaurantById);
router.post('/', protect, checkPermission(PERMISSIONS.ADD_RESTAURANT), addRestaurant);

module.exports = router;