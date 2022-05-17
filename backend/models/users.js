const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 10],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        foreignKey:true,
        validate: {
          isEmail: true,
        },
      },
   
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpassword: {
        type: DataTypes.STRING,
      },

      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      enabled: {
          type:DataTypes.BOOLEAN,
          defaultValue:true,
      },
      profile:{
        type:DataTypes.STRING,
      },
      resetToken: DataTypes.STRING,
      expireToken: DataTypes.DATE,
    },
    {
      freezeTableName: true,
    },

  );

  // Hashing Password
  Users.beforeCreate((users) => {
    return bcrypt
      .hash(users.password, 10)
      .then((hash) => {
        users.password = hash;
      })
      .catch((err) => {
        throw new Error("Hash not done", err);
      });
  });

  //Matching Password
  Users.prototype.matchPassword = async function (enterdPassword) {
    return await bcrypt.compare(enterdPassword, this.password);
  };

  // Generating Password Reset Token
  Users.prototype.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
  };

  return Users;
};
