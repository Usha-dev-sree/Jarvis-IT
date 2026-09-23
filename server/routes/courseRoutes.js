const express= require('express');
const { getCourse, createCourse, updateCourse, deleteCourse, getCourseByID } = require('../controllers/courseController');
const { protect, authorize} = require('../middleware/authMiddleware');
const courseRoutes=express.Router();
courseRoutes.get("/",getCourse)
courseRoutes.post("/",protect,authorize('instructor','admin'),createCourse)
courseRoutes.put("/:id",protect,authorize('instructor','admin'),updateCourse)
courseRoutes.get("/:id",getCourseByID)
courseRoutes.delete("/:id",protect,authorize('instructor','admin'),deleteCourse)
module.exports = courseRoutes;