import React, { useCallback, useContext, useMemo, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import { deleteSingleNote, updatenote, viewAllnote } from "../../api/notes";
import { toast } from "react-toastify";
import { IoIosCloseCircle } from "react-icons/io";

const NotesCard = () => {
  const { notes, setNotes, token, darkmode } = useContext(UserContext);
  const [data, setData] = useState({});
  const [modalOn, setModalOn] = useState(false);

  const openModal = useCallback((note) => {
    setData(note);
    setModalOn(true);
  }, []);

  const deleteNote = useCallback(
    async (id) => {
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
    },
    [token, setNotes]
  );

  const renderedNotes = useMemo(
    () =>
      notes?.map((item) => (
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
      )),
    [notes, darkmode, deleteNote, openModal]
  );

  return (
    <>
      {modalOn && <Modal data={data} setModalOn={setModalOn} />}
      {renderedNotes}
    </>
  );
};

export default React.memo(NotesCard);

const Modal = React.memo(({ data, setModalOn }) => {
  const { token, setNotes, darkmode } = useContext(UserContext);
  const [notesData, setNotesData] = useState({
    title: data.title || "",
    description: data.description || "",
    tag: data.tag || "",
  });

  const handleOnchange = useCallback((e) => {
    const { name, value } = e.target;
    setNotesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // ✅ Basic validation
    if (notesData.title.trim().length < 3) {
      return toast.error("Title must be at least 3 characters long.");
    }
    if (notesData.description.trim().length < 5) {
      return toast.error("Description must be at least 5 characters long.");
    }

    const updatedNote = {
      ...notesData,
      tag: notesData.tag.trim().length < 2 ? "general" : notesData.tag.trim(),
    };

    try {
      const resp = await updatenote(token, data._id, updatedNote);
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
        darkmode ? "bg-white/30" : "bg-black/30"
      }`}
    >
      <div
        className={`${
          darkmode ? "bg-black text-white" : "bg-white text-black"
        } p-6 rounded-lg shadow-lg w-[90%] max-w-md`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Update Note</h2>
          <button
            onClick={() => setModalOn(false)}
            className="hover:text-red-600  cursor-pointer text-xl font-bold"
          >
            <IoIosCloseCircle />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          {["title", "description", "tag"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={`Enter ${field}`}
              name={field}
              value={notesData[field]}
              onChange={handleOnchange}
              className="w-full px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
          <button
            type="submit"
            className="bg-blue-500 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            Update Task
          </button>
          <button
            onClick={() => setModalOn(false)}
            type="button"
            className="bg-red-600 cursor-pointer text-white py-2 px-6 rounded-lg hover:bg-red-700"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
});
