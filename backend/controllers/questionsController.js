const asyncHandler = require("express-async-handler");
const db = require("../models");
const Questions = db.Questions;

// Create a New Categories

const createQuestion = asyncHandler(async (req, res) => {
  const {content,answers,option1,option2,option3,option4} = req.body;

  const questions = new Questions({
    content,answers,option1,option2,option3,option4
   
   
  });

  const createdQuestions = await questions.save();
  if (createdQuestions) {
    res.status(201).json(createdQuestions);
  } else {
    res.status(404);
    throw new Error("Validation Failed");
  }
});

// get Category details
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Questions.findAll({});
  res.json(questions);
});

// get Category By Id

const getQuestionsById = asyncHandler(async (req, res) => {
  const questions = await Questions.findByPk(req.params.id);
  if (questions) {
    res.json(questions);
  } else {
    res.status(404);
    throw new Error("Questions Not Found");
  }
});

// delete a Category
const deleteQuestions = asyncHandler(async (req, res) => {
  const questions = await Questions.findByPk(req.params.id);
  if (questions) {
    await questions.destroy();
    res.json({ message: "Questions Deleted" });
  } else {
    res.status(404);
    throw new Error("Error in Deleting");
  }
});

// Update a Category

const updateQuestions = asyncHandler(async (req, res) => {
  const {content,answers,option1,option2,option3,option4} = req.body;
  const questions = await Questions.findByPk(req.params.id);

  if (questions) {
    questions.content = content;
    questions.answers = answers;
    questions.option1 = option1;
    questions.option2 =option2;
    questions.option3 = option3;
    questions.option4 = option4;
  

  const updateQuestions = await questions.save();
  res.status(201).json(updateQuestions);


  } else {
    res.status(401)
    throw new Error ("Questions not Found")
  }
})

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionsById,
  deleteQuestions,
  updateQuestions,
};
