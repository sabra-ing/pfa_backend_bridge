var express = require('express');
var router = express.Router();
const courseController= require("../Controllers/courseController")

router.get('/getAllCourses',courseController.getAllCourses);
router.get('/getCourseById/:id',courseController.getCourseById);
router.get('/getCourseByTitle',courseController.getCourseByTitle);

router.post('/addRecordedCourse',courseController.addRecordedCourse);
router.post('/addLiveCourse',courseController.addLiveCourse);

router.put('/updateCourse/:id',courseController.updateCourseById);

router.delete('/deleteCourseById/:id',courseController.deleteCourseById);

module.exports = router; // pour exporter le router dans le fichier app.js
