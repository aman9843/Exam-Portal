module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return Order;
};
