import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";

function Home() {
    // State to hold the notes fetched from the backend and API base url
    const [notes, setNotes] = useState([]);
    const API_BASE_URL = "http://127.0.0.1:8000/notes/notes/"

    // Function to fetch all notes from the Django API
    async function getNotes() {
        try {
            const response = await axios.get(API_BASE_URL);
            const apiNotes = response.data;
            const mappedNotes = apiNotes.map((apiNote) => ({
                id: apiNote.id,
                title: apiNote.title,
                content: apiNote.description,
                lastUpdated: apiNote.last_updated,
                bgColor: apiNote.bg_color
            }));

            // Update the 'notes' state with the fetched notes
            setNotes(mappedNotes);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    }


    // Function to add a new note
    async function addNote(newNote) {
        try {
            // Make a POST request to save the new note to the backend
            const response = await axios.post(API_BASE_URL, {
                title: newNote.title,
                description: newNote.content
            });

            // Backend returns the saved note data with an 'id'
            const savedNote = {
                id: response.data.id,
                title: response.data.title,
                content: response.data.description,
                lastUpdated: response.data.last_updated,
                bgColor: response.data.bg_color
            };
            // Update the 'notes' state with the new note
            setNotes((prevNotes) => [...prevNotes, savedNote]);

        } catch (error) {
            console.log(`Received an error: ${error}`);
        }
    }

    // Function to edit a note
    async function editNote(id, updatedNote) {
        try {
            const response = await axios.put(API_BASE_URL + id, {
                title: updatedNote.title,
                description: updatedNote.content,
                bg_color: updatedNote.bgColor
            });
            // Update the 'notes' state with the updated note
            setNotes((prevNotes) =>
                prevNotes.map((noteItem) => {
                    // FInd out where the ID has become string...
                    if (noteItem.id === id) {
                        const updatedItem = {
                            ...noteItem,
                            ...updatedNote,
                        }
                        return updatedItem;
                    }
                    return noteItem;
                })
            );

        } catch (error) {
            console.log(`Error editing a note: ${error}`);
        }
    }





    // Function to delete a note
    async function deleteNote(id) {
        try {
            // Make a DELETE request to remove the note from the backend
            await axios.delete(API_BASE_URL + id);

            // Update the 'notes' state by filtering out the deleted note
            setNotes((prevNotes) =>
                prevNotes.filter((noteItem) => noteItem.id !== id)
            );
        } catch (error) {
            console.log(`Error message: ${error}`);
        }
    }


    // Use useEffect to fetch notes when the component mounts
    useEffect(() => {
        getNotes();
    }, []);


    return (
        <div>
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem) => {
                return (
                    <Note
                        key={noteItem.id}
                        id={noteItem.id}
                        title={noteItem.title}
                        content={noteItem.content}
                        lastUpdated={noteItem.lastUpdated}
                        bgColor={noteItem.bgColor}
                        value={noteItem}
                        onEdit={editNote}
                        onDelete={deleteNote}
                    />
                );
            })}
        </div>
    );
}

export default Home;
