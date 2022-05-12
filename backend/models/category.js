module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
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
          min: { args: [1], msg: "Pick 0-1 please" },
          max: { args: [5], msg: "Pick 0-5 please" },
        },
      },

      
    },
    {
      freezeTableName: true,
    }
  );


  return Categories;
};
