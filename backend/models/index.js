"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require("./users")(sequelize, Sequelize);
db.Categories = require("./category")(sequelize, Sequelize);
db.Quizz = require("./quizz")(sequelize, Sequelize);
db.Questions = require("./questions")(sequelize, Sequelize);
db.Order = require("./subscription")(sequelize,Sequelize)


// Sequelize hasMany & Belongs to between Users & Categories
db.Users.hasMany(db.Categories);
db.Categories.belongsTo(db.Users, {
   
});


// Sequelize hasMany & Belongs to between Categories & Quizz

db.Categories.hasMany(db.Quizz);

db.Quizz.belongsTo(db.Categories, {
  
});

// Sequelize hasMany & Belongs to between Quizz & Questions
db.Quizz.hasMany(db.Questions);
db.Questions.belongsTo(db.Quizz, {
  
});



// Sequelize hasMany & Belongs to between Order/ User & Quizz Id 
db.Users.hasMany(db.Order);
db.Order.belongsTo(db.Users, {
   
})

// db.Quizz.hasMany(db.Order);
// db.Order.belongsTo(db.Quizz, {
  
// })

module.exports = db;
