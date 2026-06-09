import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { useEffect, useState, KeyboardEvent } from "react";
import { Note } from "../../../common/types";
import { useCreateNote, useUpdateNote } from "../hooks/useNotes";

const COLORS = [
  { name: "Default", value: "#ffffff" },
  { name: "Red", value: "#fee2e2" },
  { name: "Orange", value: "#ffedd5" },
  { name: "Yellow", value: "#fef9c3" },
  { name: "Green", value: "#dcfce7" },
  { name: "Teal", value: "#ccfbf1" },
  { name: "Blue", value: "#e0f2fe" },
  { name: "Indigo", value: "#e0e7ff" },
  { name: "Purple", value: "#f3e8ff" },
  { name: "Pink", value: "#fce7f3" },
];

interface NoteDialogProps {
  open: boolean;
  handleClose: () => void;
  note?: Note;
}

export default function NoteDialog({ open, handleClose, note }: NoteDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const createMutation = useCreateNote();
  const updateMutation = useUpdateNote();

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setColor(note.color || "#ffffff");
      setTags(note.tags || []);
    } else {
      setTitle("");
      setContent("");
      setColor("#ffffff");
      setTags([]);
    }
    setTagInput("");
  }, [note, open]);

  const handleAddTag = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().toLowerCase().replace(/,/g, "");
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const saveNote = () => {
    if (!title.trim() && !content.trim()) {
      handleClose();
      return;
    }

    const payload = {
      title: title.trim(),
      content: content.trim(),
      color,
      tags,
    };

    if (note) {
      updateMutation.mutate(
        { id: note._id, payload },
        {
          onSuccess: () => {
            handleClose();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: color,
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "700", pt: 3, pb: 1 }}>
        {note ? "Edit Note" : "Create New Note"}
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <TextField
          placeholder="Title"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={{
            disableUnderline: true,
            style: {
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "12px",
            },
          }}
        />

        <TextField
          placeholder="Take a note..."
          fullWidth
          multiline
          rows={5}
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          InputProps={{
            disableUnderline: true,
            style: { fontSize: "1rem", lineHeight: 1.6 },
          }}
        />

        {/* Tags management */}
        <Box sx={{ mt: 3, mb: 1 }}>
          <Typography variant="caption" fontWeight="600" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            TAGS (Press Enter or Comma to add)
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => handleRemoveTag(tag)}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.06)",
                  fontWeight: 500,
                  fontSize: "0.8rem",
                }}
              />
            ))}
          </Box>
          <TextField
            placeholder="Add tag..."
            fullWidth
            variant="outlined"
            size="small"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              },
            }}
          />
        </Box>

        {/* Color Palette Choice */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" fontWeight="600" color="text.secondary" sx={{ display: "block", mb: 1 }}>
            COLOR THEME
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {COLORS.map((c) => (
              <Tooltip title={c.name} key={c.value}>
                <Box
                  onClick={() => setColor(c.value)}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: c.value,
                    border: "1px solid",
                    borderColor: color === c.value ? "#4f46e5" : "#cbd5e1",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {color === c.value && <Check sx={{ fontSize: 14, color: "#4f46e5" }} />}
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontWeight: "500",
            color: "text.secondary",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={saveNote}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2.5,
            fontWeight: "600",
            px: 3,
            background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca 0%, #2563eb 100%)",
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
