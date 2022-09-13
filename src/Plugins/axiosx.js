import axios from "axios";

export const service = axios.create({
    baseURL: process.env.REACT_APP_API,
});

service.interceptors.response.use(
    (response) => response,
    (e) => {
        if (!e.response) {
            return;
        }

        alert(e.response.data);

        // Redirection based on the responses or handling of other events can be done here (i.e e.response.status === 401)
        // e.response.status === 422

        return Promise.reject(e);
    }
);
