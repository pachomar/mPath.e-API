const userController = require("../sequelize/controllers").userController;
const veteranController = require("../sequelize/controllers").veteranController;

module.exports = app => {

  app.post("/User/Create", userController.createUserLogin);

  app.post("/User/Profile", userController.updateUserProfile);

  app.post("/User/Settings", userController.updateUserSettings);

  app.post("/User/Notification", userController.updateUserNotifications);

  app.put("/User/Reset", userController.updateUserPassword);

  app.put("/User/Verify", userController.verifyUserAccount);

  app.get("/User/Validate", userController.verifyUserCode);

  app.get("/User/Login", userController.userLoginAttempt);

  app.get("/User/Resend", userController.userRequestCode);

  app.post("/Veteran/Basic", veteranController.updateVeteranBasic);

  app.post("/Veteran/Service", veteranController.updateVeteranService);

  app.post("/Veteran/Titles", veteranController.updateVeteranTitles);

  app.put("/Veteran/Media", veteranController.uploadVeteranMedia);

  app.put("/Veteran/Submit", veteranController.submitVeteranProfile);

  app.get("/Veteran/Search", veteranController.searchWithFilters);

  app.get("/Veteran/Profile", veteranController.getVeteranProfile);

  app.get("/Veteran/Story", veteranController.getVeteranMedia);

  app.get("/*", (req, res) =>
    res.status(200).send({
        message: "Welcome to the Cobb Veteran Memorial Foundation API"
    })
  );

};