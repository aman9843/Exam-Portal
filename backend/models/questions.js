module.exports = (sequelize, DataTypes) => {
    const Questions = sequelize.define(
      "Questions",
      {
        content: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [1, 50],
          },
        },
  
        answers: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: [2, 100],
          },
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
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
  