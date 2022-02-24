const mongoose = require('mongoose');
const {Schema} = mongoose;


const exerciseSchema = mongoose.Schema ({
    nameWorkout: {
        type: String,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    rpe: {
        type: Number,
        required: true
    }
},{
    timestamps: true,
    collection: 'workout'
}
);

const workoutSchema =  new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    nameSession: {
        type: String,
        required: true
    },
    exercises: {
        type: [exerciseSchema]
    }
},{
    timestamps: true,
    collection: 'workout'
}
);

module.exports = mongoose.model('workout', workoutSchema);



