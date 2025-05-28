const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (req.user.role !== "admin" && restaurant.country !== req.user.country) {
      return res.status(403).json({
        message:
          "Forbidden: Cannot order from restaurants outside your country",
      });
    }

    // Build the order items with name and price
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = restaurant.menu.id(item.itemId);

      if (!menuItem) {
        return res.status(400).json({
          message: `Menu item with ID ${item.itemId} not found`,
        });
      }

      orderItems.push({
        itemId: item.itemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      });

      totalAmount += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      restaurant: restaurantId,
      items: orderItems, // Use the built items array
      totalAmount,
      country: restaurant.country,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role !== "admin") {
      if (!order.user.equals(req.user._id)) {
        return res.status(403).json({
          message: "Forbidden: You can only place your own orders",
        });
      }

      if (order.country !== req.user.country) {
        return res.status(403).json({
          message:
            "Forbidden: Access to resources outside your country is restricted",
        });
      }
    }

    order.status = "placed";
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (req.user.role !== "admin") {
      if (!order.user.equals(req.user._id)) {
        return res.status(403).json({
          message: "Forbidden: You can only cancel your own orders",
        });
      }

      if (order.country !== req.user.country) {
        return res.status(403).json({
          message:
            "Forbidden: Access to resources outside your country is restricted",
        });
      }
    }

    order.status = "cancelled";
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    let filter = { user: req.user._id };

    if (req.user.role === "manager") {
      filter = { country: req.user.country };
    }

    const orders = await Order.find(filter).populate("restaurant", "name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
