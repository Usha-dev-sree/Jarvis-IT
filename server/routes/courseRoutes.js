const express= require('express');
const { getCourse, createCourse, updateCourse, deleteCourse, getCourseByID } = require('../controllers/courseController');
const courseRoutes=express.Router();
courseRoutes.get("/",getCourse)
courseRoutes.post("/",createCourse)
courseRoutes.put("/:id",updateCourse)
courseRoutes.get("/:id",getCourseByID)
courseRoutes.delete("/:id",deleteCourse)
module.exports = courseRoutes;