import React, { useContext, useState } from "react";
import { addNote, deleteAllnotes, viewAllnote } from "../api/notes";
import { UserContext } from "../context/UserProvider";
import NotesCard from "./subComponents/NotesCard";
import { toast } from "react-toastify";

const Home = () => {
  const { token, notes, setNotes, darkmode, setdarkMode } =
    useContext(UserContext);
  const [notesData, setnotesData] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setnotesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      if (!token) {
        toast.warning("login or register first");
      }
      const dataToSend = {
        title: notesData.title,
        description: notesData.description,
        ...(notesData.tag.length > 0 && { tag: notesData.tag }),
      };

      const resp = await addNote(token, dataToSend);
      if (resp.status === 201) {
        setnotesData({ title: "", description: "", tag: "" });
        const refreshed = await viewAllnote(token);
        if (refreshed.status === 200) {
          setNotes(refreshed.data.notes);
        }
      }
      if (resp.status === 400) {
        resp.response.data.extraDetails.map((item) => {
          toast.error(item);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const resp = await deleteAllnotes(token);
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
  return (
    <div
      className={`homeSection ${
        darkmode && "bg-gray-950"
      }  flex flex-col gap-6 px-4`}
    >
      {/* Add Note Section */}
      <div className="addNoteSection">
        <form
          onSubmit={handleFormSubmit}
          className={`max-w-md w-full mx-auto mt-10 ${
            darkmode ? "bg-black text-white" : "bg-white"
          } p-6 rounded-2xl shadow-xl flex flex-col gap-4`}
        >
          <h2
            className={`text-2xl font-bold ${
              darkmode && "text-white"
            } text-center text-gray-800`}
          >
            Add a New Task
          </h2>

          <input
            type="text"
            placeholder="Enter title"
            className={`w-full  text-gray-600 ${
              darkmode
                ? "placeholder:text-gray-600 text-white"
                : "placeholder:text-gray-400"
            } w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={notesData.title}
            onChange={handleOnchange}
            name="title"
          />

          <input
            type="text"
            placeholder="Enter description"
            className={`w-full  text-gray-600 ${
              darkmode
                ? "placeholder:text-gray-600 text-white"
                : "placeholder:text-gray-400"
            } w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            value={notesData.description}
            onChange={handleOnchange}
            name="description"
          />

          <input
            type="text"
            placeholder="Enter tag"
            className={`w-full  text-gray-600 ${
              darkmode
                ? "placeholder:text-gray-600 text-white"
                : "placeholder:text-gray-400"
            } w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
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
      </div>

      {/* Notes Section */}
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-gray-400 mb-4 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-700">
            No notes yet!
          </h2>
          <p className="text-gray-500 mt-2">
            Start by clicking the{" "}
            <span className="text-blue-500 font-medium">"Add Note"</span> button
            to create your first one.
          </p>
        </div>
      ) : (
        <>
          <div className="p-10 flex flex-col gap-10 ">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
              <NotesCard />
            </ul>
            <div className="flex items-center justify-center">
              <button
                className="bg-red-400  px-2 py-2 text-white rounded-sm cursor-pointer hover:bg-red-600 "
                onClick={handleDeleteAll}
              >
                Delete all notes
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
