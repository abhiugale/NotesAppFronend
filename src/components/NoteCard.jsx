import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "../api/axios";
import NoteDialog from "./NoteDialog";
import { useState } from "react";

export default function NoteCard({ note, refresh }) {
  const [open, setOpen] = useState(false);

  const deleteNote = async () => {
    await api.delete(`/notes/${note._id}`);
    refresh();
  };

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6">{note.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {note.content}
          </Typography>
        </CardContent>

        <CardActions>
          <IconButton onClick={() => setOpen(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={deleteNote} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <NoteDialog
        open={open}
        handleClose={() => setOpen(false)}
        note={note}
        refresh={refresh}
      />
    </>
  );
}
