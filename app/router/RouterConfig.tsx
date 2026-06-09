import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { APP_ROUTES } from "./appRoutes";
import MainLayout from "../layouts/MainLayout";
import NotesPage from "../../modules/notes/pages/NotesPage";
import LoginPage from "../../modules/auth/pages/LoginPage";
import RegisterPage from "../../modules/auth/pages/RegisterPage";
import { NotesFilterProvider } from "../../modules/notes/store/NotesFilterContext";
import { Box, CircularProgress } from "@mui/material";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  return children;
}

function PublicRoute({ children }: { children: React.ReactElement }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (token) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  return children;
}

export default function RouterConfig() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path={APP_ROUTES.LOGIN}
        element={
          <PublicRoute>
            <LoginPage
              onLoginSuccess={(user, token) => {
                login(user, token);
                navigate(APP_ROUTES.HOME);
              }}
              switchToRegister={() => navigate(APP_ROUTES.REGISTER)}
            />
          </PublicRoute>
        }
      />
      <Route
        path={APP_ROUTES.REGISTER}
        element={
          <PublicRoute>
            <RegisterPage
              onRegisterSuccess={(user, token) => {
                login(user, token);
                navigate(APP_ROUTES.HOME);
              }}
              switchToLogin={() => navigate(APP_ROUTES.LOGIN)}
            />
          </PublicRoute>
        }
      />
      <Route
        path={APP_ROUTES.HOME}
        element={
          <ProtectedRoute>
            <NotesFilterProvider>
              <MainLayout>
                <NotesPage />
              </MainLayout>
            </NotesFilterProvider>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={APP_ROUTES.HOME} replace />} />
    </Routes>
  );
}
