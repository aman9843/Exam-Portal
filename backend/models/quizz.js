module.exports = (sequelize, DataTypes) => {
  const Quizz = sequelize.define(
    "Quizz",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 10],
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      maxMarks: {
        type: DataTypes.INTEGER(5),
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
    },
    {
      freezeTableName: true,
    }
  );


  return Quizz;
};
