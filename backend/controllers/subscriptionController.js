const asyncHandler = require("express-async-handler");
const db = require("../models");
const Order = db.Order;
const User = db.Users;
var Razorpay = require("razorpay");

// create Order

// var instance = new Razorpay({
//   key_id: 'rzp_test_ColRZQW1RnAetU',
//   key_secret:'llkAoUgkrr5rfOjNfDFVS5fb'

// })

const createOrder = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  const { amount,premiumCourse } = req.body;

  const order = Order.create({
    amount,
    UserId: user.id,
    premiumCourse,
  });


  if (order) {
    res.status(201).json(order);
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

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//get current order

// // get user details
// const getOrder = asyncHandler(async (req, res) => {
//   const order = await Order.findByPk(req.Order.id);
//   console.log(order)

//   if (order) {
//     res.json({
//       id: order.id,
//       amount:order.amount,
//       premiumCourse:order.premiumCourse

//     });
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// get Order by UserId

const getOrderByUserId = asyncHandler(async (req, res) => {
  const order = await Order.findAll({ where: { UserId: req.params.id } });
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});


// cancel subscription via admin
const deleteOrder = asyncHandler(async (req, res) => {
  const quizz = await Order.findByPk(req.params.id);
  if (quizz) {
    await quizz.destroy();
    res.json({ message: "Subscription Canceled" });
  } else {
    res.status(404);
    throw new Error("Error in Cancelling");
  }
});


module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  getOrderByUserId,
  deleteOrder
};
