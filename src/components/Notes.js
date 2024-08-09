import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../context/Notecontext";
const Notes = (props) => {
  const {updatenote}=props
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [tag, settag] = useState("");
  const context = useContext(NoteContext);
  const { handledelete, handlesubmit, notes, setnotes } = context;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const fetchNotes = async () => {
      const url = "http://localhost:5000/fetchallnotes";
      const headers = {
        "Content-Type": "application/json",
        "auth-token": token,
      };
      try {
        const response = await fetch(url, { method: "GET", headers });
        if (response.ok) {
          const json = await response.json();
          setnotes(json);
        } else {

          console.error("Failed to fetch notes:", await response.json());
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, [setnotes]);

  const onchange = (e) => {
    const { id, value } = e.target;
    if (id === "title") {
      settitle(value);
    }
    if (id === "description") {
      setdescription(value);
    }
    if (id === "tag") {
      settag(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handlesubmit(title, description, tag, settitle, setdescription, settag);
  };

  return (
    <>
      {localStorage.getItem("token") && (
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={onchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={onchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="tag"
                value={tag}
                onChange={onchange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={title.length < 5 || description.length < 5}
            >
              Add Note
            </button>
          </form>
        </div>
      )}

      {localStorage.getItem("token") && (
        <div className="container mt-4">
          <div className="row">
            {notes.map((note, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card" style={{ width: "100%" }}>
                  <div className="card-header d-flex justify-content-end">
                    <i
                      className="fa-solid fa-trash mx-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handledelete(note._id)}
                    >
                      {" "}
                    </i>
                    <i
                      className="fa-regular fa-pen-to-square"
                      style={{ cursor: "pointer" }}
                      onClick={() => updatenote(note)}
                    >
                      
                      {" "}
                    </i>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </>
  );
};

export default Notes;
