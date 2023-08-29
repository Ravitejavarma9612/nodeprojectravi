const express = require("express");
const router = express.Router();
const {createUser,getUser} = require("../controllers/loginController");

router.post("/",createUser);
router.get("/:username",getUser);

module.exports = router;
