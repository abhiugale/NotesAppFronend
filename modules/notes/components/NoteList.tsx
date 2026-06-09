import { Grid, Box, Typography } from "@mui/material";
import { StickyNote2Outlined } from "@mui/icons-material";
import NoteCard from "./NoteCard";
import { Note } from "../../../common/types";

interface NoteListProps {
  notes: Note[];
  refresh: () => void;
}

export default function NoteList({ notes, refresh }: NoteListProps) {
  if (!notes || notes.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 12,
          px: 4,
          textAlign: "center",
        }}
      >
        <StickyNote2Outlined
          sx={{
            fontSize: 70,
            color: "text.disabled",
            mb: 2,
            opacity: 0.6,
          }}
        />
        <Typography variant="h6" fontWeight="600" color="text.secondary" gutterBottom>
          No notes found
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ maxWidth: 320 }}>
          Create a new note, clear your active search, or add a new tag to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {notes.map((note) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={note._id}>
          <NoteCard note={note} refresh={refresh} />
        </Grid>
      ))}
    </Grid>
  );
}
