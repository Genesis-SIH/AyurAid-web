import axios from "axios";
const url = "https://ayuraid.onrender.com/api";
export const addBlog = async (data, token) => {
  try {
    console.log(data);
    return await axios.post(`${url}/blog/addBlog`, data, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (token) => {
  try {
    return await axios.get(`${url}/blog/allBlogs`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogById = async (token, id) => {
  try {
    return await axios.get(`${url}/blog/blog/${id.id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAuthorBlogs = async (token, id) => {
  try {
    return await axios.get(`${url}/blog/blog/${id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const blogByTag = async (token, id) => {
  try {
    return await axios.get(`${url}/blog/filter/${id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const searchBlog = async (token, id) => {
  try {
    return await axios.get(`${url}/blog/search/${id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const bookmark = async (id, token) => {
  try {
    console.log(token);
    let data = await axios.patch(`${url}/blog/bookmark/${id}`, {
      headers: { Token: token },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const unbookmark = async (id, token) => {
  try {
    let data = await axios.patch(`${url}/blog/unbookmark/${id}`, {
      headers: { Token: token },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const likeBlog = async (id, token) => {
  try {
    console.log(token);
    let data = await axios.patch(`${url}/blog/like/${id}`, {
      headers: { Token: token },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const unlikeBlog = async (id, token) => {
  try {
    let data = await axios.patch(`${url}/blog/unlike/${id}`, {
      headers: { Token: token },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
