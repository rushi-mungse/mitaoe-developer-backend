const Joi = require("joi");
const User = require("../models/User");
const HandleCustomError = require("../services/HandleCustomError");

class FormController {
  async fillForm(req, res, next) {
    const { name, email, phone, branch } = req.body;

    const userSchema = Joi.object({
      name: Joi.string().min(3).max(35).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().length(10).required(),
      branch: Joi.string().required(),
    });

    const { error } = userSchema.validate(req.body);
    if (error) return next(error);

    try {
      const user = await User.findOne({ email });
      if (user)
        return next(
          HandleCustomError.handlingCustomError(
            501,
            "Email or Phone already registered."
          )
        );
      else {
        const newUser = new User({
          name,
          phone,
          email,
          branch,
        });
        newUser.save();
        return res.json({ user: newUser, isRegistered: true });
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new FormController();
