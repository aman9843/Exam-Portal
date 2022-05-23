module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define(
      "Questions",
      {
        content: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 1000],
          },
        },
  
        answers: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 100],
          },
        },
        option1:{
            type: DataTypes.STRING,
        },
        option2:{
            type:DataTypes.STRING
        },
        option3:{
            type:DataTypes.STRING
        },
        option4:{
            type:DataTypes.STRING

        },
       
        
      },
      {
        freezeTableName: true,
      }
    );
   
  
   
    return Questions;
  };
  