const express = require("express");
const router = express.Router();
const User = require("../Model/user");
const { body, validationResult } = require("express-validator");
//creating routers

router.post(
  "/user/create",
  body("fullname").notEmpty().withMessage("Please enter your fullname!"),
  body("email")
    .notEmpty()
    .withMessage("Please enter your email!")
    .isEmail()
    .withMessage("You have entered inavlid email!"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ msg: errors.array()[0].msg });
      } else {
       const checkUser = await User.findOne({email:req.body.email})
       if(!checkUser){
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ msg: "User created successfully..." });
       }else{
        res.status(400).json({ msg: "User email already exist!" });
       }
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

//user updating
router.put("/user/edit/:id", async (req, res) => {
  try {
    //updating details
    const result = await User.findByIdAndUpdate(req.params.id, {
      fullname: req.body.fullname,
      email: req.body.email,
    });
    if (result) {
      res.status(200).json({ msg: "User Updated successfully..." });
    } else {
      res.status(400).json({ msg: "User Id not Found!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
//user delate
router.delete("/user/delete/:id", async (req, res) => {
  try {
    //updating details
    const result = await User.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).json({ msg: "User Deleted successfully..." });
    } else {
      res.status(400).json({ msg: "User Id not Found!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
//user get details
router.get("/users", async (req, res) => {
  try {
    //updating details
    const result = await User.find();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ msg: "User Id not Found!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
//user get single details
router.get("/user/:id", async (req, res) => {
  try {
    //updating details
    const result = await User.findOne({_id:req.params.id});
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ msg: "User Id not Found!" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
