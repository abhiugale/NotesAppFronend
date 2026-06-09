import { useState, useRef, KeyboardEvent } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Chip,
  Collapse,
  ClickAwayListener,
  Tooltip,
} from "@mui/material";
import {
  Check,
  PaletteOutlined,
  PushPin,
  PushPinOutlined,
} from "@mui/icons-material";
import { useCreateNote } from "../hooks/useNotes";

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

interface QuickAddNoteProps {}

export default function QuickAddNote({}: QuickAddNoteProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [pinned, setPinned] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const createMutation = useCreateNote();

  const handleExpand = () => {
    if (!expanded) {
      setExpanded(true);
    }
  };

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

  const handleSave = () => {
    if (!title.trim() && !content.trim()) {
      resetForm();
      return;
    }

    createMutation.mutate(
      {
        title: title.trim(),
        content: content.trim(),
        color,
        pinned,
        tags,
      },
      {
        onSuccess: () => {
          resetForm();
        },
      }
    );
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setColor("#ffffff");
    setPinned(false);
    setTags([]);
    setTagInput("");
    setExpanded(false);
    setShowColorPicker(false);
  };

  const handleClickAway = () => {
    if (expanded) {
      handleSave();
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        ref={containerRef}
        sx={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto 32px auto",
          backgroundColor: color,
          borderRadius: 3.5,
          border: "1px solid",
          borderColor: color !== "#ffffff" ? "transparent" : "#e2e8f0",
          boxShadow: expanded
            ? "0 10px 25px rgba(0, 0, 0, 0.08)"
            : "0 2px 10px rgba(0, 0, 0, 0.02)",
          transition: "background-color 0.2s, box-shadow 0.2s, border-color 0.2s",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Pin Button */}
          {expanded && (
            <Tooltip title={pinned ? "Unpin Note" : "Pin Note"}>
              <IconButton
                onClick={() => setPinned(!pinned)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  color: pinned ? "#4f46e5" : "text.secondary",
                  zIndex: 2,
                }}
              >
                {pinned ? <PushPin sx={{ fontSize: 18 }} /> : <PushPinOutlined sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>
          )}

          {/* Title Field (shown when expanded) */}
          <Collapse in={expanded}>
            <TextField
              placeholder="Title"
              fullWidth
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontWeight: "600",
                  fontSize: "1.05rem",
                  paddingBottom: "8px",
                },
              }}
              sx={{ mb: 1, pr: 4 }}
            />
          </Collapse>

          {/* Main content field (acting as trigger too) */}
          <TextField
            placeholder={expanded ? "Take a note..." : "Take a note..."}
            fullWidth
            multiline
            rows={expanded ? 4 : 1}
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={handleExpand}
            InputProps={{
              disableUnderline: true,
              style: {
                fontSize: "0.95rem",
                color: "#2d3748",
              },
            }}
          />

          {/* Tags chips + input (shown when expanded) */}
          <Collapse in={expanded}>
            <Box sx={{ mt: 2 }}>
              {tags.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onDelete={() => handleRemoveTag(tag)}
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        fontSize: "0.75rem",
                        height: 22,
                      }}
                    />
                  ))}
                </Box>
              )}
              <TextField
                placeholder="Add tag..."
                variant="standard"
                size="small"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: "0.8rem",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0, 0, 0, 0.03)",
                    width: "fit-content",
                    minWidth: "120px",
                  },
                }}
              />
            </Box>
          </Collapse>

          {/* Action Row (shown when expanded) */}
          <Collapse in={expanded}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
                pt: 1,
                borderTop: "1px solid rgba(0, 0, 0, 0.04)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Choose Color">
                  <IconButton
                    size="small"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    sx={{ color: "text.secondary" }}
                  >
                    <PaletteOutlined sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>

                {showColorPicker && (
                  <Box sx={{ display: "flex", gap: 0.5, ml: 1 }}>
                    {COLORS.map((c) => (
                      <Box
                        key={c.value}
                        onClick={() => setColor(c.value)}
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          backgroundColor: c.value,
                          border: "1px solid",
                          borderColor: color === c.value ? "#4f46e5" : "#cbd5e1",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      >
                        {color === c.value && <Check sx={{ fontSize: 9, color: "#4f46e5" }} />}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  size="small"
                  onClick={resetForm}
                  sx={{
                    textTransform: "none",
                    fontWeight: "500",
                    color: "text.secondary",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSave}
                  sx={{
                    textTransform: "none",
                    fontWeight: "600",
                    borderRadius: 2,
                    background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
                  }}
                >
                  Add Note
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </ClickAwayListener>
  );
}
