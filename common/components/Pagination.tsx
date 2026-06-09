import { Box, IconButton, Select, MenuItem, Typography, SelectChangeEvent } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  onLimitChange: (limit: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
}: PaginationProps) {
  const handleLimitChange = (e: SelectChangeEvent<number>) => {
    onLimitChange(Number(e.target.value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mt: 4,
        pt: 2,
        borderTop: "1px solid #e2e8f0",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Items per page:
        </Typography>
        <Select
          value={limit}
          onChange={handleLimitChange}
          size="small"
          sx={{
            borderRadius: 2,
            height: 32,
            "& .MuiSelect-select": { py: 0.5, fontSize: "0.875rem" },
          }}
        >
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={12}>12</MenuItem>
          <MenuItem value={24}>24</MenuItem>
          <MenuItem value={48}>48</MenuItem>
        </Select>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          size="small"
          sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}
        >
          <NavigateBefore />
        </IconButton>
        <Typography variant="body2" sx={{ mx: 1, fontWeight: "600" }}>
          Page {page} of {totalPages || 1}
        </Typography>
        <IconButton
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          size="small"
          sx={{ border: "1px solid #e2e8f0", borderRadius: 2 }}
        >
          <NavigateNext />
        </IconButton>
      </Box>
    </Box>
  );
}
