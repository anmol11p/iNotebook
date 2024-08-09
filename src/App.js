import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NoteContext } from './context/Notecontext'; // Import Provider and Context
import Singnup from "./components/Singnup";
import Navbar from "./components/navbar";
import About from "./components/about";
import Login from "./components/Login";
import Notes from "./components/Notes";
import { useState, useRef, useContext,useEffect} from "react";
import Alerts from './components/Alerts';

function App() {
  // const [notes, setnotes] = useState([])
  // eslint-disable-next-line
  const [email,setemail]=useState('')
  // eslint-disable-next-line
  const {notes, setnotes,setAlert,Alertgayab} = useContext(NoteContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
  })
  const handleupdate = async (e) => {
    e.preventDefault();   
    let url = `http://localhost:5000/updatenote/${currentNoteId}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    };
    try {
      const response = await fetch(url, options);
      const updatedNote = await response.json();
      setnotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === currentNoteId ? updatedNote : note
        )
      );
      ref.current.click(); // Close the modal
      setAlert({
        msg: "Note Updated Successfully",
        opacity: 1,
        success:"success"
      })
      Alertgayab();
    } catch (error) {
      console.error(error);
    }
  };

  const updatenote = (note) => {
    setTitle(note.title);
    setDescription(note.description);
    setTag(note.tag);
    setCurrentNoteId(note._id);
    setemail(note.email)
    ref.current.click();
  };
  return (
    <>
   
        <Router>
          <Navbar/>
          <Alerts/>
          <Routes>
            <Route path="/" element={<Notes updatenote={updatenote} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Singnup />} />
          </Routes>
        
    
      <button
        type="button"
        className="btn btn-primary"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{display:"none"}}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* form.............................. */}
              
              <form onSubmit={handleupdate}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </div>

                <div className="d-flex">
                  <button
                    type="submit"
                    className="btn btn-primary mx-2"
                    disabled={title.length < 5 || description.length < 5}
                  >
                    update note
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
              
              {/* form khatam.......................................... */}
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      </Router>
      
    </>
  );
}

export default App;
