import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URI}/note`,
});

const addNote = async (token, dataToSend) => {
  try {
    const resp = await api.post("/add", dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};

const viewAllnote = async (token) => {
  try {
    const resp = await api.get("/view", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {}
};

const deleteSingleNote = async (token, id) => {
  try {
    const resp = await api.delete(`/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (error) {
    return error;
  }
};
const deleteAllnotes = async (token) => {
  try {
    const resp = await api.delete(`/deleteAll`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp;
  } catch (error) {
    return error;
  }
};

const updatenote = async (token, id, notesData) => {
  try {
    const resp = await api.patch(`/update/${id}`, notesData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return resp;
  } catch (error) {
    return error;
  }
};
export { addNote, viewAllnote, deleteSingleNote, deleteAllnotes, updatenote };
