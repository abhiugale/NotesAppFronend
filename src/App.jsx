import { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import api from "./api/axios";
import NoteList from "./components/NoteList";
import NoteDialog from "./components/NoteDialog";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotes = async () => {
    const res = await api.get("/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            p: 8,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          {/* 🔹 FULL WIDTH APPBAR */}
          <AppBar position="static" sx={{ width: "100%", text: "center" }}>
            {/* 🔹 CENTERED CONTENT INSIDE APPBAR */}
            <Container maxWidth="md">
              <Toolbar disableGutters>
                <Typography variant="h6">📝 Notes App</Typography>
              </Toolbar>
            </Container>
          </AppBar>

          {/* 🔹 CENTERED PAGE CONTENT */}
          <Box
            sx={{
              minHeight: "calc(100vh - 64px)",
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Container maxWidth="md">
              <NoteList notes={notes} refresh={fetchNotes} />
            </Container>
          </Box>

          {/* 🔹 FLOATING ACTION BUTTON */}
          <Fab
            color="primary"
            sx={{ position: "fixed", bottom: 32, right: 32 }}
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </Fab>

          {/* 🔹 NOTE DIALOG */}
          <NoteDialog
            open={open}
            handleClose={() => setOpen(false)}
            refresh={fetchNotes}
          />
        </Box>
      </Box>
    </>
  );
}
