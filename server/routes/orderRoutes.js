const express = require('express');
const { 
  createOrder, 
  placeOrder, 
  cancelOrder, 
  getUserOrders 
} = require('../controllers/orderController');
const protect = require('../middleware/auth');
const { checkPermission } = require('../middleware/rbac');
const { PERMISSIONS } = require('../config/roles');

const router = express.Router();

router.use(protect);

router.get('/', getUserOrders);
router.post('/', checkPermission(PERMISSIONS.CREATE_ORDER), createOrder);
router.post('/:id/place', checkPermission(PERMISSIONS.PLACE_ORDER), placeOrder);
router.post('/:id/cancel', checkPermission(PERMISSIONS.CANCEL_ORDER), cancelOrder);

module.exports = router;