import { Grid } from "@mui/material";
import NoteCard from "./NoteCard";

export default function NoteList({ notes, refresh }) {
  return (
    <Grid container spacing={3} justifyContent="center">
      {notes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note._id}>
          <NoteCard note={note} refresh={refresh} />
        </Grid>
      ))}
    </Grid>
  );
}
