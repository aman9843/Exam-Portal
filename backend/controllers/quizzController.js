const asyncHandler = require("express-async-handler");
const { Categories } = require("../models");
const db = require("../models");
const Quizz = db.Quizz;

// Create a New Categories

const createQuizz = asyncHandler(async (req, res) => {

  
  const { title, description, maxMarks, numberOfQuestions, enabled,CategoryId} = req.body;
  


  const quizz = new Quizz({
    title,
    description,
    maxMarks,
    numberOfQuestions,
    enabled,
    CategoryId
    
});

  const createdQuizz = await quizz.save();
  if (createdQuizz) {
    res.status(201).json(createdQuizz);
  } else {
    res.status(404);
    throw new Error("Validation Failed");
  }
});

// get Category details
const getAllQuizz = asyncHandler(async (req, res) => {
  const quizz = await Quizz.findAll({});
  res.json(quizz);
});

// get Category By Id

const getQuizzById = asyncHandler(async (req, res) => {
  const quizz = await Quizz.findByPk(req.params.id);
  if (quizz) {
    res.json(quizz);
  } else {
    res.status(404);
    throw new Error("Quizz Not Found");
  }
});

// delete a Category
const deleteQuizz = asyncHandler(async (req, res) => {
  const quizz = await Quizz.findByPk(req.params.id);
  if (quizz) {
    await quizz.destroy();
    res.json({ message: "Quizz Deleted" });
  } else {
    res.status(404);
    throw new Error("Error in Deleting");
  }
});

// Update a Category

const updateQuizz = asyncHandler(async (req, res) => {
  const {title,description,maxMarks,numberOfQuestions,enabled} = req.body;
  const quizz = await Quizz.findByPk(req.params.id);

  if (quizz) {
    quizz.title = title;
    quizz.description = description;
    quizz.maxMarks = maxMarks;
    quizz.numberOfQuestions =numberOfQuestions;
    quizz.enabled = enabled;
  

  const updateQuizz = await quizz.save();
  res.status(201).json(updateQuizz);


  } else {
    res.status(401)
    throw new Error ("Quizz not Found")
  }
})


//get Quizz by CategoryId
const getQuizzByCategoryId = asyncHandler(async (req, res) => {
  const quizz = await Quizz.findAll({where:{CategoryId:req.params.id}});
  if (quizz) {
    res.json(quizz);
  } else {
    res.status(404);
    throw new Error("Quizz Not Found");
  }
});



module.exports = {
  createQuizz,
  getAllQuizz,
  getQuizzById,
  deleteQuizz,
  updateQuizz,
  getQuizzByCategoryId
};
