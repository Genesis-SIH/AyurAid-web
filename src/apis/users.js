import axios from "axios";
const url = "https://backend2114.azurewebsites.net";
export const registerUser = async (body) => {
  try {
    return await axios.post(`${url}/api/auth/signup`, body);
  } catch (error) {
    console.log("Error in registerUser api");
  }
};

export const loginUser = async (data) => {
  try {
    return await axios.post(`${url}/api/auth/login`, data, {
      withCredentials: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserById = async (id, token) => {
  try {
    return await axios.get(`${url}/api/user/user/${id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
