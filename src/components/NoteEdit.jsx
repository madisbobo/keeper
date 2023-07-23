import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Fab from "@mui/material/Fab";
import React, { useState } from "react";

function NoteEdit(props) {
  // State to manage the edited note
  const [note, setNote] = useState({
    id: props.editProps.id,
    title: props.editProps.title,
    content: props.editProps.content,
    bgColor: props.editProps.bgColor
  });

  // Function to handle changes in the input fields
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  // Function to submit the edited note
  function submitNote() {
    if (note.title || note.content) {
      props.editProps.onEdit(props.editProps.id, note);
      setNote({
        title: "",
        content: ""
      });
    }
    leaveEditMode();
  }

  // Function to leave edit mode and return to normal note view
  function leaveEditMode() {
    props.leaveEditMode();
  }

  // Function to handle keypress events (e.g., pressing Enter key)
  function handleKeypress(event) {
    if (event.key === "Enter" && event.ctrlKey) {
      // Submit the note if Enter key + Ctrl is pressed
      submitNote();
    } else if (event.key === "Enter" && event.target.name === "title") {
      // Prevent default behavior of Enter key in the title field (to avoid creating new lines)
      event.preventDefault();
    }
  }

  return (
    <form className="edit-note">
      {/* Input field for editing the title */}
      <input
        name="title"
        onChange={handleChange}
        onKeyDown={handleKeypress}
        value={note.title}
        placeholder="Title"
        style={{ backgroundColor: note.bgColor }}
        autoFocus
      />

      {/* Textarea field for editing the content */}
      <textarea
        name="content"
        onChange={handleChange}
        onKeyDown={handleKeypress}
        value={note.content}
        placeholder="Take note..."
        style={{ backgroundColor: note.bgColor }}
        rows="3"
      />

      {/* Close icon to cancel and exit edit mode */}
      <Fab onClick={leaveEditMode}>
        <CloseIcon />
      </Fab>

      {/* Check icon to submit and save the edited note */}
      <Fab onClick={submitNote}>
        <CheckIcon />
      </Fab>
    </form>
  );
}

export default NoteEdit;
