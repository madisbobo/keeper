import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote() {
    if (note.title || note.content) {
      props.onAdd(note);
      setNote({
        title: "",
        content: ""
      });
    }
  }


  function handleKeypress(event) {
    if (event.key === "Enter" && event.ctrlKey) {
        submitNote();
        event.preventDefault();
    } else if (event.key === "Enter" && event.target.name === "title") {
        event.preventDefault();
    }

    
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            onKeyDown={handleKeypress}
            value={note.title}
            placeholder="Title"
            autoFocus
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={() => setIsExpanded(true)}
          onKeyDown={handleKeypress}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded ? true : false}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
