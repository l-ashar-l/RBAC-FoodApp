const PaymentMethod = require('../models/PaymentMethod');

exports.getPaymentMethod = async (req, res) => {
  try {
    const paymentMethod = await PaymentMethod.findOne({ user: req.user._id });
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePaymentMethod = async (req, res) => {
  try {
    const { cardNumber, expiry, cvv } = req.body;
    
    let paymentMethod = await PaymentMethod.findOne({ user: req.user._id });
    
    if (paymentMethod) {
      paymentMethod.cardNumber = cardNumber;
      paymentMethod.expiry = expiry;
      paymentMethod.cvv = cvv;
      await paymentMethod.save();
    } else {
      paymentMethod = await PaymentMethod.create({
        user: req.user._id,
        cardNumber,
        expiry,
        cvv
      });
    }
    
    res.json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};