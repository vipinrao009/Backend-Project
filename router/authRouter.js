const express = require("express");
const {home,signUp,signIn,getUser, logOut} =require("../controllers/authControllers.js")
const jwtAuth=require('../middleware/jwtAuth.js')
const router = express.Router();

router.get('/', home);
router.post("/signup",signUp)
router.post("/signin",signIn)
router.get('/getuser',jwtAuth,getUser)
router.get('/logout',jwtAuth,logOut)


module.exports = router;
