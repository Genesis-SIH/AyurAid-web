import axios from "axios";
const url = "http://localhost:8000";
export const registerUser = async (body) => {
  try {
    return await axios.post(`http://localhost:80/api/auth/signup`, body);
  } catch (error) {
    console.log("Error in registerUser api");
  }
};

export const loginUser = async (data) => {
  try {
    return await axios.post(`http://localhost:80/api/auth/login`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (id, token) => {
  try {
    return await axios.get(`http://localhost:80/api/user/user/${id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
