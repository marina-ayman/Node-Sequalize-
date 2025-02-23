const  User  = require("../models/User").User
const  sequelize  = require("../models/User").sequelize


sequelize
  .sync()
  .then(() => {
    console.log("Database synced");

    return User.create({
      firstName: "Marina",
      lastName: "Ayman",
      email: "admin@gmail.com",
      password: "123456",
      age: 24,
      isAdmin: 1
    });
  })
  .then((user) => {
    console.log("Row inserted:", user.toJSON());
    process.exit();
  })
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });

//   node seeders/insertUser.js
