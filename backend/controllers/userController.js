const asyncHandler = require('express-async-handler')
const db = require('../models')
const User = db.Users
const generateToken = require('../util/generateToken')





//Register a User 
const registerNewUser = asyncHandler(async(req,res) => {
    const {name,email,password,cpassword} = req.body;

    const userExist = await User.findOne({where:{ email }});

    if (userExist) {
      res.status(400);
      throw new Error("User Already Exist");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      cpassword,
    });
  
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
})



// Login 
const login = asyncHandler(async(req,res) => {
  const {email,password} = req.body;

  const user = await User.findOne({where:{email}})
 
  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      enabled:user.enabled,
      token: generateToken(user.id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email & Password ");
  }

})


// get user details 
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  console.log(user)

  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      enabled:user.enabled,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


// delete users
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    await user.destroy();
    res.json({ message: "User Removed" });
  } else {
    res.status(404);
    throw new Error();
  }
});



// update user by id via admin
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
  }

  const updatedUser = await user.save();

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    eamil: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});



module.exports = {registerNewUser,login,getUser,deleteUser,updateUserById}