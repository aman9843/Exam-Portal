module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      amount: {
        type: DataTypes.INTEGER,
      },

      premiumCourse: {
        type: DataTypes.STRING,
        defaultValue:true
      }
    },
    {
      freezeTableName: true,
    }
  );

  return Order;
};
