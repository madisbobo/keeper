// Importing required modules and components
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Fab from "@mui/material/Fab";
import React, { useState } from "react";
import NoteEdit from "./NoteEdit";

// Note component function
function Note(props) {
    // State variables
    const [editMode, setEditMode] = useState(false);
    const [mouseOver, setMouseOver] = useState(false);
    const [backgroundColorBox, setBackgroundColorBox] = useState(false);
    const colors = ["FFFFFF", "#B5EAEA", "#B6E2A1", "#FFFBC1", "#FEBE8C", "#F7A4A4"];

    // Function to handle delete button click
    function deleteClick(event) {
        props.onDelete(props.id);
        event.stopPropagation(); // Prevents the click from propagating to the parent element
    }

    // Function to handle edit button click
    function editClick() {
        setEditMode(true);
    }

    // Function to leave edit mode and reset mouseOver state
    function leaveEditMode() {
        setEditMode(false);
        setMouseOver(false);
    }

    // Function to display formatted date
    function showDate() {
        const currentDate = new Date();
        const dateObject = new Date(props.lastUpdated);
        const options = { month: "short", day: "numeric" };

        if (currentDate.getFullYear() > dateObject.getFullYear()) {
            options.year = "numeric";
        }
        const formattedString = dateObject.toLocaleDateString(undefined, options);
        return formattedString;
    }

    // Function to toggle background color box visibility
    function toggleBackgroundColorBox(event) {
        setBackgroundColorBox((preValue) => !preValue);
        event.stopPropagation();
    }

    // Function to handle color selection
    function handleColorClick(event) {
        const color = event.target.dataset.color;

        props.onEdit(props.id, {
            title: props.title,
            content: props.content,
            bgColor: color
        });

        toggleBackgroundColorBox(event);
        setMouseOver(false);
        event.stopPropagation();
    }

    return (
        <div
            id={props.id}
            className="note"
            onMouseOver={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            style={{ backgroundColor: props.bgColor }}
        >
            {/* Render NoteEdit component if in edit mode, otherwise render note content */}
            {editMode ? (
                <NoteEdit
                    editProps={props}
                    leaveEditMode={leaveEditMode}
                />
            ) : (
                <div onClick={editClick}>
                    <h1>{props.title}</h1>
                    <p className="content">{props.content}</p>
                    <p className="date">{showDate()}</p>

                    {/* Show delete and background color icons when mouse is over the note */}
                    <div style={{ visibility: mouseOver ? "" : "hidden" }}>
                        <Fab onClick={deleteClick}><DeleteIcon /></Fab>
                        <Fab><ColorLensIcon onClick={toggleBackgroundColorBox} /></Fab>
                    </div>

                    {/* Show background color options if background color icon is clicked */}
                    {backgroundColorBox && (
                        <div className="color-box">
                            <ul className="color-list">
                                {colors.map((color, index) => {
                                    return (
                                        <li
                                            key={index}
                                            data-color={color}
                                            className="color-item"
                                            style={{ backgroundColor: color }}
                                            onClick={handleColorClick}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Note;
