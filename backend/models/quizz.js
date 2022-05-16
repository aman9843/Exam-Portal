module.exports = (sequelize, DataTypes) => {
  const Quizz = sequelize.define(
    "Quizz",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      maxMarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      numberOfQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.STRING,
        defaultValue: true,
      },

      // categoryId : {
      //   type:DataTypes.INTEGER,
      //   references:{
      //     model:{
      //       tableName:'categories',
      //       schema:'static'
      //     },
      //      key:'id'
      //   },
      //   allowNull:false
      // }
    },
    {
      freezeTableName: true,
    }
  );


  return Quizz;
};
