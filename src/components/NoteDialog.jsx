import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function NoteDialog({ open, handleClose, note, refresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const saveNote = async () => {
    if (note) {
      await api.put(`/notes/${note._id}`, { title, content });
    } else {
      await api.post("/notes", { title, content });
    }
    refresh();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{note ? "Edit Note" : "Add Note"}</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          margin="dense"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={saveNote} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
