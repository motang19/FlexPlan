
import http from "../http.js";

class WorkoutConns {
    signup(user){
        return http.post(`/signup`, user);
    }
    signin(user) {
        return http.post(`/signin`, user);
    }
}

export default new WorkoutConns();

