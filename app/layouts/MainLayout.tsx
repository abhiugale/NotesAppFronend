import { ReactNode } from "react";
import {
  Box,
  Typography,
  IconButton,
  InputBase,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search,
  Logout,
  ArchiveOutlined,
  LabelOutlined,
  StickyNote2Outlined,
} from "@mui/icons-material";
import { useAuth } from "../providers/AuthProvider";
import { useNotesFilter } from "../../modules/notes/store/NotesFilterContext";

const DRAWER_WIDTH = 280;

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { user, logout } = useAuth();
  const {
    search,
    setSearch,
    filterType,
    setFilterType,
    selectedTag,
    setSelectedTag,
    allTags,
    mobileOpen,
    setMobileOpen,
  } = useNotesFilter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const sidebarContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Sidebar Header */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
          color: "white",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "white",
            color: "#4f46e5",
            fontWeight: "700",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {user?.username?.substring(0, 2).toUpperCase() || "N"}
        </Avatar>
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="subtitle1" fontWeight="700" sx={{ lineHeight: 1.2 }}>
            {user?.username}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8, display: "block", overflow: "hidden", textOverflow: "ellipsis" }}>
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={filterType === "all" && !selectedTag}
            onClick={() => {
              setFilterType("all");
              setSelectedTag(null);
              setMobileOpen(false);
            }}
            sx={{
              borderRadius: 3,
              "&.Mui-selected": {
                backgroundColor: "rgba(79, 70, 229, 0.08)",
                color: "#4f46e5",
                "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.12)" },
                "& .MuiListItemIcon-root": { color: "#4f46e5" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <StickyNote2Outlined />
            </ListItemIcon>
            <ListItemText primary="All Notes" primaryTypographyProps={{ fontWeight: "600", fontSize: "0.95rem" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            selected={filterType === "archived" && !selectedTag}
            onClick={() => {
              setFilterType("archived");
              setSelectedTag(null);
              setMobileOpen(false);
            }}
            sx={{
              borderRadius: 3,
              "&.Mui-selected": {
                backgroundColor: "rgba(79, 70, 229, 0.08)",
                color: "#4f46e5",
                "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.12)" },
                "& .MuiListItemIcon-root": { color: "#4f46e5" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ArchiveOutlined />
            </ListItemIcon>
            <ListItemText primary="Archive" primaryTypographyProps={{ fontWeight: "600", fontSize: "0.95rem" }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ mx: 2 }} />

      {/* Tags List */}
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography variant="caption" fontWeight="700" color="text.secondary" sx={{ letterSpacing: "0.5px" }}>
          TAGS
        </Typography>
      </Box>

      <List sx={{ px: 2, flexGrow: 1, overflowY: "auto", pb: 2 }}>
        {allTags.length === 0 ? (
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="body2" color="text.disabled" fontStyle="italic">
              No tags created yet
            </Typography>
          </Box>
        ) : (
          allTags.map((tag) => (
            <ListItem disablePadding key={tag} sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={selectedTag === tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 3,
                  "&.Mui-selected": {
                    backgroundColor: "rgba(79, 70, 229, 0.08)",
                    color: "#4f46e5",
                    "&:hover": { backgroundColor: "rgba(79, 70, 229, 0.12)" },
                    "& .MuiListItemIcon-root": { color: "#4f46e5" },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LabelOutlined />
                </ListItemIcon>
                <ListItemText primary={tag} primaryTypographyProps={{ fontWeight: "500", fontSize: "0.9rem" }} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>

      <Divider />

      {/* Logout Action */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            color: "error.main",
            "&:hover": { backgroundColor: "rgba(239, 68, 68, 0.08)" },
          }}
        >
          <ListItemIcon sx={{ color: "error.main", minWidth: 40 }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Log Out" primaryTypographyProps={{ fontWeight: "600", fontSize: "0.95rem" }} />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc", width: "100%" }}>
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: "1px solid #e2e8f0",
              boxShadow: "2px 0 10px rgba(0,0,0,0.01)",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Sidebar - Mobile */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        {/* Top Floating App Bar */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderBottom: "1px solid #f1f5f9",
            backgroundColor: "white",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} edge="start">
              <MenuIcon />
            </IconButton>
          )}

          {/* Search Bar Panel */}
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: 600,
              backgroundColor: "#f1f5f9",
              borderRadius: 3,
              px: 2,
              py: 0.5,
              mx: "auto",
            }}
          >
            <Search sx={{ color: "text.secondary", mr: 1.5, fontSize: 20 }} />
            <InputBase
              placeholder="Search notes by title, content, or tags..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ fontSize: "0.95rem" }}
            />
            {search && (
              <IconButton size="small" onClick={() => setSearch("")}>
                <Typography variant="caption" sx={{ fontWeight: "600" }}>Clear</Typography>
              </IconButton>
            )}
          </Paper>
        </Box>

        {children}
      </Box>
    </Box>
  );
}
