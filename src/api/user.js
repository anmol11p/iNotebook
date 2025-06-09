import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/auth`,
});

const userLogin = async (dataToSend) => {
  try {
    const resp = await api.post("/login", dataToSend);
    return resp;
  } catch (error) {
    return error;
  }
};

const userRegister = async (dataToSend) => {
  try {
    const resp = await api.post("/register", dataToSend);
    return resp;
  } catch (error) {
    return error;
  }
};

export { userLogin, userRegister };
