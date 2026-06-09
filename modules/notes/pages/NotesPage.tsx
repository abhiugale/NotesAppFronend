import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tooltip,
  Fab,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import NoteList from "../components/NoteList";
import NoteDialog from "../components/NoteDialog";
import QuickAddNote from "../components/QuickAddNote";
import { useNotesFilter } from "../store/NotesFilterContext";
import { usePagination } from "../../../common/hooks/usePagination";
import Pagination from "../../../common/components/Pagination";
import { Note } from "../../../common/types";
import { useNotesQuery, useTagsQuery } from "../hooks/useNotes";

export default function NotesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const {
    debouncedSearch,
    filterType,
    selectedTag,
    sortBy,
    setSortBy,
    order,
    setOrder,
    setAllTags,
  } = useNotesFilter();

  const {
    page,
    limit,
    total,
    totalPages,
    setPage,
    setLimit,
    setPaginationData,
    resetPage,
  } = usePagination(1, 12);

  const { data: notesData, refetch: refetchNotes } = useNotesQuery({
    isArchived: filterType === "archived",
    page,
    limit,
    sortBy,
    order,
    search: debouncedSearch,
    tag: selectedTag || undefined,
  });

  const { data: tagsData } = useTagsQuery();

  const notes = (notesData || []) as Note[];

  // Sync pagination metadata when query data changes
  useEffect(() => {
    if (notesData) {
      const resData = notesData as any;
      if (resData._pagination) {
        setPaginationData(resData._pagination);
      } else {
        setPaginationData({
          total: notesData.length,
          page: 1,
          limit: limit,
          totalPages: 1,
        });
      }
    }
  }, [notesData, limit, setPaginationData]);

  // Sync tags list when tag list query updates
  useEffect(() => {
    if (tagsData) {
      setAllTags(tagsData);
    }
  }, [tagsData, setAllTags]);

  // Reset page when filterType, selectedTag, or search query changes
  useEffect(() => {
    resetPage();
  }, [filterType, selectedTag, debouncedSearch]);

  return (
    <Box sx={{ p: { xs: 3, md: 4 }, flexGrow: 1 }}>
      {/* Active Filtering Tags Header */}
      {(selectedTag || filterType === "archived") && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
          <Typography variant="body2" color="text.secondary">
            Showing:
          </Typography>
          {filterType === "archived" && (
            <Chip
              label="Archived Notes"
              color="primary"
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            />
          )}
          {selectedTag && (
            <Chip
              label={`Tag: ${selectedTag}`}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2, fontWeight: 600 }}
            />
          )}
        </Box>
      )}

      {/* Keep-style Quick Note Add Box */}
      {filterType !== "archived" && <QuickAddNote />}

      {/* List Toolbar (Summary + Sorting) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          mt: filterType !== "archived" ? 4 : 0,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary" fontWeight="500">
          {notes.length > 0 ? (
            `Showing ${Math.min((page - 1) * limit + 1, total)}–${Math.min(
              page * limit,
              total
            )} of ${total} notes`
          ) : (
            "No notes found"
          )}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" color="text.secondary" fontWeight="500">
            Sort by:
          </Typography>
          <Select
            value={`${sortBy}-${order}`}
            onChange={(e) => {
              const [field, dir] = (e.target.value as string).split("-");
              setSortBy(field);
              setOrder(dir as "asc" | "desc");
            }}
            size="small"
            sx={{
              borderRadius: 2,
              height: 32,
              "& .MuiSelect-select": { py: 0.5, fontSize: "0.875rem" },
            }}
          >
            <MenuItem value="updatedAt-desc">Newest First</MenuItem>
            <MenuItem value="updatedAt-asc">Oldest First</MenuItem>
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Core Notes Grid */}
      <NoteList notes={notes} refresh={refetchNotes} />

      {/* Pagination Controls */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        limit={limit}
        onLimitChange={setLimit}
      />

      {/* Floating Action Button for Desktop/Mobile (alternative add trigger) */}
      <Tooltip title="Create Note">
        <Fab
          onClick={() => setDialogOpen(true)}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
            color: "white",
            boxShadow: "0 10px 20px rgba(79, 70, 229, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca 0%, #2563eb 100%)",
            },
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      {/* Dialog Modal */}
      <NoteDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
    </Box>
  );
}
