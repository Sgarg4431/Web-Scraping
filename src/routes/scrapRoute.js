const express=require("express");
const router=express.Router();
const controller=require("../controllers/scrap");

// scrap route
router.get("/scrap",controller.scrap);


module.exports=router;