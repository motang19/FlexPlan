const express = require('express');
const router = express.Router();

const { signup, signin } = require('./controllers/authController');
const { getAllWorkouts, getWorkouts, addWorkouts, addExercises, updateWorkouts, updateExercises, deleteWorkouts, deleteExercises, getPrs} =require('./controllers/workoutController')

router.post('/signup', signup);
router.post('/signin', signin);
router
    .route('/workouts')
    .get(getAllWorkouts)
    .post(addWorkouts)
    .put(updateWorkouts)
    .delete(deleteWorkouts)
router
    .route('/workouts/id/:id')
    .get(getWorkouts)
    .post(addExercises)
    .put(updateExercises)
    .delete(deleteExercises)

module.exports = router;