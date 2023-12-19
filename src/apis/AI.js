
import axios from "axios";
// const url = "https://ayuraid.onrender.com/api";
// const url = "https://ayuraid-ai-y2sw.onrender.com/blog/ask";

export const searchAI = async (AI) => {
  try {
    // console.log(data);
    return await axios.post(
      `https://ayuraid-ai-y2sw.onrender.com/blog/ask`,
      AI
    );
  } catch (error) {
    console.log(error);
  }
};