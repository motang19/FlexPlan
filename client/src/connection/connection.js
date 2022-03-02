
import http from "../http.js";

class WorkoutConns {
    signup(user){
        return http.post(`/signup`, user);
    }
    signin(user) {
        return http.post(`/signin`, user);
    }
    getAllWorkout(){
        return http.get(`/workouts`)
    }
    filter(query, query_name){
        return http.get(`/workouts?${query_name}=${query}`)
    }
    addWorkout(workout){
        return http.post(`/workouts`, workout)
    }
    updateWorkout(workout, id){
        return http.put(`/workouts?id=${id}`, workout)
    }
    deleteWorkout(id){
        return http.delete(`/workouts?id=${id}`)
    }
    getWorkout(id){
        return http.get(`/workouts/id/${id}`)
    }
    addExercise(id, exercise){
        return http.post(`/workouts/id/${id}`, exercise)
    }
    updateExercise(id, exercise, exercise_id){
        return http.put(`/workouts/id/${id}?exercise_id=${exercise_id}`, exercise)
    }
    deleteExercise(id, exercise_id){
        return http.delete(`/workouts/id/${id}?exercise_id=${exercise_id}`)
    }

}

export default new WorkoutConns();

