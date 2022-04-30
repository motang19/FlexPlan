const Workout = require('../../models/workouts');
require('dotenv').config();

exports.getAllWorkouts = async (req, res, next) => {
    let filters = {};
    if( req.query.nameSession){
        filters.nameSession = req.query.nameSession
    }else if (req.query.date){
        filters.date = req.query.date
    }
    try{
        let query
        if("nameSession" in filters){
            query = {nameSession: filters.nameSession};
        }else if("date" in filters){
            query = {date: filters.date};
        }
        const workoutsList = await Workout.find(query);
        const numOfWorkouts = await Workout.count(query);
        let response = {
            workouts: workoutsList,
            filters: filters,
            total_results: numOfWorkouts
        };
        res.json(response);
    }
    catch(e){
        res.status(500).json({error: e.message})
    }
    
}

exports.addWorkouts = (req, res, next) => {
    let {name, date, nameSession} = req.body;
    const workout = new Workout({
        name: name,
        date: date,
        nameSession: nameSession,
    });
    workout.save()
        .then(response => {
        res.status(200).json({
            success: true,
            result: response
            })
        })
        .catch(e =>{
        res.status(500).json({error: e.message})
        })
    }

exports.addExercises = (req, res, next) => {
    let {nameWorkout, weight, sets, reps, rpe} = req.body;
    Workout.findByIdAndUpdate({_id: req.params.id},
        {
            $push: 
            {
                exercises: {
                    nameWorkout: nameWorkout,
                    weight: weight,
                    sets: sets,
                    reps: reps,
                    rpe: rpe
                }
            }
        }
    ).exec()
        .then(response =>{
            res.status(200).json({
                success: true,
                result: response
            })
        })
        .catch(err=>{
            res.status(500).json({error:err.message})
        })
}
        

exports.getWorkouts = (req, res, next) => {
    Workout.findOne({_id: req.params.id}, function(err, result){
        if (err){
           return res.status(500).json({error: err.message});
        }
        return res.json(result);
    })

}


exports.updateWorkouts = (req, res, next) => {
    Workout.findOneAndUpdate({"_id": req.query.id}, 
        {
            $set: 
            {
                date: req.body.date, 
                nameSession: req.body.nameSession
            }
        }
    ).exec()
        .then(response =>{
            res.status(200).json({
                success: true,
                result: response
            })
        })
        .catch(err=>{
            res.status(500).json({error:err.message})
        })

}

exports.updateExercises = (req, res, next) => {
    Workout.findOneAndUpdate({"_id": req.params.id, "exercises._id": req.query.exercise_id}, 
        {
            $set: 
            {
                "exercises.$.nameWorkout": req.body.nameWorkout, 
                "exercises.$.weight": req.body.weight, 
                "exercises.$.sets": req.body.sets, 
                "exercises.$.reps": req.body.reps,
                "exercises.$.rpe": req.body.rpe 
            }
        }
    ).exec()
        .then(response =>{
            res.status(200).json({
                success: true,
                result: response
            })
        })
        .catch(err=>{
            res.status(500).json({error:err.message})
        })

}

exports.deleteWorkouts = (req, res, next) => {
    Workout.findOneAndDelete({_id: req.query.id}).exec()
        .then(response =>{
            res.status(200).json({
                success: true,
                result: response
            })
        })
        .catch(err =>{
            res.status(500).json({error: err.message});
        })
}
exports.deleteExercises = (req, res, next) => {
    Workout.findOneAndUpdate({"_id": req.params.id}, 
        {
            $pull: 
            {
                exercises: {
                    "_id": req.query.exercise_id
                }
            }
        }
    ).exec()
        .then(response =>{
            res.status(200).json({
                success: true,
                result: response
            })
        })
        .catch(err=>{
            res.status(500).json({error:err.message})
        })

}