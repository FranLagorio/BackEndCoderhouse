import axios from "axios";

export const backendAPI = axios.create({
  baseURL: "http://localhost:8080/",
});

export const loginUser = (body, setUser) => {
  axios
    .post("http://localhost:8080/login", body)
    .then(function (response) {
      setUser({ ...response.data });
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};
