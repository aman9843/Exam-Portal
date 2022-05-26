const asyncHandler = require("express-async-handler");
const db = require("../models");
const Order = db.Order;
const User = db.Users;

// create Order

const createOrder = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  const { amount, QuizzId } = req.body;

  const order = new Order({
    amount,
    UserId: user.id,
    QuizzId,
  });
  const createdOrder = await order.save();
  if (createdOrder) {
    res.status(201).json(createdOrder);
  } else {
    res.status(404);
    throw new Error("Validation Failed");
  }
});

// get Order Details


const getAllOrder = asyncHandler(async (req, res) => {
    const order = await Order.findAll({});
    res.json(order);
  });


// get Order by User id

const getOrderById = asyncHandler(async (req,res) => {
    const order = await Quizz.findByPk(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
})


// get Order by UserId

const getOrderByUserId = asyncHandler(async (req,res) => {
    const order = await Order.findAll({ where: { UserId: req.params.id } });
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order Not Found");
    }
})



module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  getOrderByUserId
};
