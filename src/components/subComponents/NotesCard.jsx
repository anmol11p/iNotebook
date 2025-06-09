import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { deleteSingleNote, updatenote, viewAllnote } from "../../api/notes";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";
const NotesCard = () => {
  const { notes, setNotes, token, darkmode } = useContext(UserContext);
  const [data, setData] = useState({});
  const [modalOn, setModalOn] = useState(false);
  const deleteNote = async (id) => {
    try {
      const resp = await deleteSingleNote(token, id);

      if (resp.status === 200) {
        toast.success(resp.data.message);
        const refreshed = await viewAllnote(token);
        if (refreshed.status === 200) {
          setNotes(refreshed.data.notes);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (note) => {
    setData(note);
    setModalOn(true);
  };

  return (
    <>
      {modalOn && <Modal data={data} setModalOn={setModalOn} />}
      {notes?.map((item) => (
        <li
          key={item._id}
          className={`p-4 rounded-lg shadow-md ${
            darkmode ? "bg-black text-white" : "bg-white"
          } flex flex-col gap-2`}
        >
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className={darkmode ? "text-white" : "text-gray-700"}>
            {item.description}
          </p>
          <span className="text-sm text-blue-600">Tag: {item.tag}</span>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => deleteNote(item._id)}
              className="px-4 py-1 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => openModal(item)}
              className="px-4 py-1 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </li>
      ))}
    </>
  );
};
const Modal = ({ data, setModalOn }) => {
  const { token, setNotes, darkmode } = useContext(UserContext);
  const [notesData, setNotesData] = useState({
    title: data.title || "",
    description: data.description || "",
    tag: data.tag || "",
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setNotesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await updatenote(token, data._id, notesData);
      if (resp.status === 200) {
        toast.success(resp.data.message);
        const refreshed = await viewAllnote(token);
        if (refreshed.status === 200) {
          setNotes(refreshed.data.notes);
          setModalOn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm ${
        darkmode ? "bg-white/30" : " bg-black/30"
      }`}
    >
      <div
        className={`${
          darkmode ? "bg-black" : "bg-white"
        } p-6 rounded-lg shadow-lg w-[90%] max-w-md`}
      >
        <div className="flex items-center justify-between mb-4 ">
          <h2 className={`${darkmode && "text-white"} text-xl font-bold`}>
            Update Note
          </h2>
          <button
            onClick={() => setModalOn(false)}
            className="text-gray-500 cursor-pointer hover:text-red-600 text-xl font-bold"
          >
            <IoIosCloseCircle className="text-xl" />
          </button>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className={`max-w-md w-full mx-auto mt-10 ${
            darkmode ? "bg-black text-white" : "bg-white text-black"
          }  p-6 rounded-2xl shadow-xl flex flex-col gap-4`}
        >
          <input
            type="text"
            placeholder="Enter title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={notesData.title}
            onChange={handleOnchange}
            name="title"
          />

          <input
            type="text"
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={notesData.description}
            onChange={handleOnchange}
            name="description"
          />

          <input
            type="text"
            placeholder="Enter tag"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={notesData.tag}
            onChange={handleOnchange}
            name="tag"
          />

          <button
            type="submit"
            className="mt-4 cursor-pointer bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Task
          </button>
        </form>
        <button
          onClick={() => setModalOn(false)}
          className="mt-4 px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotesCard;
