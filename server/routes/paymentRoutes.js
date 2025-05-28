const express = require('express');
const { 
  getPaymentMethod, 
  updatePaymentMethod 
} = require('../controllers/paymentController');
const protect = require('../middleware/auth');
const { checkPermission } = require('../middleware/rbac');
const { PERMISSIONS } = require('../config/roles');

const router = express.Router();

router.use(protect);

router.get('/', getPaymentMethod);
router.put('/', checkPermission(PERMISSIONS.UPDATE_PAYMENT), updatePaymentMethod);

module.exports = router;