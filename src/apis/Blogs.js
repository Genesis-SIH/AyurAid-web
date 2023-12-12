import axios from "axios";
const url = "http://localhost:8000";
export const postBlog = async (body) => {
  try {
    return await axios.post(`${url}/addBlog`, body);
  } catch (error) {
    console.log("error in post blog api");
  }
};
export const getAllBlogs = async (token) => {
  try {
    return await axios.get(`https://ayuraid.onrender.com/api/blog/allBlogs`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogById = async (token, id) => {
  try {
    return await axios.get(`https://ayuraid.onrender.com/api/blog/blog/${id}`, {
      headers: { Token: token },
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAuthorBlogs = async (id) => {
  try {
    return await axios.get(`${url}/blogsByAuthorId/${id}`);
  } catch (error) {
    console.log(error);
  }
};
export const blogByTag = async (id) => {
  try {
    return await axios.get(`${url}/tag/${id}`);
  } catch (error) {
    console.log("error in blog by tag api");
  }
};
export const categoryCount = async () => {
  try {
    return await axios.get(`${url}/categorycount`);
  } catch (error) {
    console.log("error in categorycount api");
  }
};
export const searchBlog = async (value) => {
  try {
    return await axios.get(`${url}/search/title?q=${value}`);
  } catch (error) {
    console.log(error);
  }
};
export const searchAuthor = async (value) => {
  try {
    return await axios.get(`${url}/search/author?q=${value}`);
  } catch (error) {
    console.log(error);
  }
};
export const searchCategory = async (value) => {
  try {
    return await axios.get(`${url}/search/category?q=${value}`);
  } catch (error) {
    console.log(error);
  }
};
export const bookmark = async (id, body) => {
  try {
    return await axios.patch(`${url}/bookmark/${id}`, body);
  } catch (error) {
    console.log("error in bookmark api");
  }
};
export const unbookmark = async (id, body) => {
  try {
    return await axios.patch(`${url}/unbookmark/${id}`, body);
  } catch (error) {
    console.log("error in unbookmark api");
  }
};
export const likeBlog = async (id, body) => {
  try {
    return await axios.patch(`${url}/like/${id}`, body);
  } catch (error) {
    console.log("error in like api " + error);
  }
};
export const unlikeBlog = async (id, body) => {
  try {
    return await axios.patch(`${url}/unlike/${id}`, body);
  } catch (error) {
    console.log("error in like api " + error);
  }
};
