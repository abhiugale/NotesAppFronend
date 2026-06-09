import { useState, MouseEvent } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Menu,
  Grow,
} from "@mui/material";
import {
  DeleteOutline,
  EditOutlined,
  PushPin,
  PushPinOutlined,
  PaletteOutlined,
  ArchiveOutlined,
  UnarchiveOutlined,
  ContentCopyOutlined,
  Check,
} from "@mui/icons-material";
import { useUpdateNote, useDeleteNote } from "../hooks/useNotes";
import NoteDialog from "./NoteDialog";
import { Note } from "../../../common/types";

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

interface NoteCardProps {
  note: Note;
  refresh: () => void;
}

export default function NoteCard({ note, refresh }: NoteCardProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const [colorMenuAnchor, setColorMenuAnchor] = useState<null | HTMLElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const deleteMutation = useDeleteNote();
  const updateMutation = useUpdateNote();

  const deleteNote = () => {
    deleteMutation.mutate(note._id);
  };

  const togglePin = () => {
    updateMutation.mutate({ id: note._id, payload: { pinned: !note.pinned } });
  };

  const toggleArchive = () => {
    updateMutation.mutate({ id: note._id, payload: { isArchived: !note.isArchived } });
  };

  const changeColor = (colorVal: string) => {
    updateMutation.mutate({ id: note._id, payload: { color: colorVal } });
    setColorMenuAnchor(null);
  };

  const copyToClipboard = () => {
    const textToCopy = `${note.title}\n\n${note.content}`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleColorClick = (e: MouseEvent<HTMLButtonElement>) => {
    setColorMenuAnchor(e.currentTarget);
  };

  return (
    <Grow in={true}>
      <Card
        elevation={0}
        sx={{
          backgroundColor: note.color || "#ffffff",
          borderRadius: 4,
          border: "1px solid",
          borderColor: note.color && note.color !== "#ffffff" ? "transparent" : "#e2e8f0",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
          transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
          position: "relative",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.05)",
            borderColor: "rgba(0, 0, 0, 0.05)",
            "& .card-actions": {
              opacity: 1,
            },
            "& .pin-button": {
              opacity: 1,
            },
          },
        }}
      >
        {/* Pin Button */}
        <Tooltip title={note.pinned ? "Unpin Note" : "Pin Note"}>
          <IconButton
            className="pin-button"
            onClick={togglePin}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              opacity: note.pinned ? 1 : 0,
              transition: "opacity 0.2s",
              color: note.pinned ? "#4f46e5" : "text.secondary",
              backgroundColor: note.pinned ? "rgba(79, 70, 229, 0.06)" : "transparent",
              "&:hover": {
                backgroundColor: note.pinned ? "rgba(79, 70, 229, 0.1)" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {note.pinned ? <PushPin sx={{ fontSize: 18 }} /> : <PushPinOutlined sx={{ fontSize: 18 }} />}
          </IconButton>
        </Tooltip>

        <CardContent sx={{ pt: 3, pb: 1, px: 3 }}>
          {/* Note Title */}
          <Typography
            variant="h6"
            fontWeight="600"
            color="text.primary"
            sx={{
              mb: 1.5,
              pr: 4,
              wordBreak: "break-word",
              fontSize: "1.1rem",
              lineHeight: 1.3,
            }}
          >
            {note.title || <span style={{ color: "#a0aec0", fontStyle: "italic" }}>Untitled</span>}
          </Typography>

          {/* Note Content */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              mb: 2,
              minHeight: 30,
              lineHeight: 1.5,
              color: "#4a5568",
            }}
          >
            {note.content}
          </Typography>

          {/* Note Tags */}
          {note.tags && note.tags.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1 }}>
              {note.tags.map((tag, idx) => (
                <Chip
                  key={idx}
                  label={tag}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "0.75rem",
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    color: "text.primary",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          )}
        </CardContent>

        {/* Action Panel */}
        <CardActions
          className="card-actions"
          sx={{
            justifyContent: "flex-end",
            opacity: 0,
            transition: "opacity 0.2s",
            px: 2,
            pb: 1.5,
            pt: 0,
          }}
        >
          {/* Copy */}
          <Tooltip title={isCopied ? "Copied!" : "Copy Note"}>
            <IconButton size="small" onClick={copyToClipboard} sx={{ color: "text.secondary" }}>
              {isCopied ? <Check sx={{ fontSize: 16, color: "green" }} /> : <ContentCopyOutlined sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>

          {/* Color palette */}
          <Tooltip title="Change Color">
            <IconButton
              size="small"
              onClick={handleColorClick}
              sx={{ color: "text.secondary" }}
            >
              <PaletteOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>

          {/* Archive / Unarchive */}
          <Tooltip title={note.isArchived ? "Unarchive" : "Archive"}>
            <IconButton size="small" onClick={toggleArchive} sx={{ color: "text.secondary" }}>
              {note.isArchived ? (
                <UnarchiveOutlined sx={{ fontSize: 16 }} />
              ) : (
                <ArchiveOutlined sx={{ fontSize: 16 }} />
              )}
            </IconButton>
          </Tooltip>

          {/* Edit */}
          <Tooltip title="Edit Note">
            <IconButton size="small" onClick={() => setOpenEdit(true)} sx={{ color: "text.secondary" }}>
              <EditOutlined sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>

          {/* Delete */}
          <Tooltip title="Delete Note">
            <IconButton size="small" onClick={deleteNote} color="error">
              <DeleteOutline sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        </CardActions>

        {/* Color picker menu */}
        <Menu
          anchorEl={colorMenuAnchor}
          open={Boolean(colorMenuAnchor)}
          onClose={() => setColorMenuAnchor(null)}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: 3,
              padding: 1,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(4px)",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 1,
              p: 0.5,
            }}
          >
            {COLORS.map((c) => (
              <Tooltip title={c.name} key={c.value}>
                <Box
                  onClick={() => changeColor(c.value)}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: c.value,
                    border: "1px solid",
                    borderColor: note.color === c.value ? "#4f46e5" : "#cbd5e1",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.1s",
                    "&:hover": {
                      transform: "scale(1.15)",
                    },
                  }}
                >
                  {note.color === c.value && (
                    <Check sx={{ fontSize: 12, color: "#4f46e5" }} />
                  )}
                </Box>
              </Tooltip>
            ))}
          </Box>
        </Menu>

        <NoteDialog
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          note={note}
        />
      </Card>
    </Grow>
  );
}
