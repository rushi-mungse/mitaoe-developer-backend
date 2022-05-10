const formController = require("../controllers/formController");

const routers = require("express").Router();

routers.post("/fill-user-form", formController.fillForm);

module.exports = routers;
