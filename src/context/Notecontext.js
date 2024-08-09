import React, { createContext, useState } from "react";
export const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {

  const [notes, setnotes] = useState([]);
  const [Alert,setAlert]=useState({
    msg:"",
    opacity:0,
    success:""
  })
  const Alertgayab=()=>{
    setTimeout(() => {
      setAlert({opacity:0})
    },2000);
    
  }
  const handledelete = async (id) => {
    let url = `http://localhost:5000/deletenote/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };

    try {
      let data = await fetch(url, options);
      // eslint-disable-next-line
      let promise = await data.json();
      setnotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      setAlert({
        msg: "Note Deleted Successfully",
        opacity: 1,
        success:"danger"
      })
      Alertgayab();
    } catch (error) {
      console.error(error);
    }
  };

  const handlesubmit = async (
    title,
    description,
    tag,
    settitle,
    setdescription,
    settag
  ) => {
    let url = "http://localhost:5000/addnote";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    };
    try {
      const data = await fetch(url, options);
      const json = await data.json();
      setnotes((prevNotes) => [...prevNotes, json.savednote]); // Append new note to the existing notes
      settitle(""); // Clear form fields
      setdescription("");
      settag("");
      setAlert({
        msg: "Note Added Successfully",
        opacity: 1,
        success:"success"
      })
      Alertgayab();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <NoteContext.Provider
      value={{ notes, handledelete, handlesubmit,setnotes,Alert,setAlert,Alertgayab}}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
