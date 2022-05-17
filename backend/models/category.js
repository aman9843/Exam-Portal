module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20],
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: { args: [1], msg: "Pick 0-1 please" },
          max: { args: [100], msg: "Pick 0-5 please" },
        },
      },

      // c_id :{
      //   type:DataTypes.INTEGER,
      //   allowNull:false,
      //   foreignKey:true
      // }

      
    },
    {
      freezeTableName: true,
    }
  );



  return Categories;
};
