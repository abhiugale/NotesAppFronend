export const theme = {
  colors: {
    primary: "var(--color-primary)",
    primaryHover: "var(--color-primary-hover)",
    secondary: "var(--color-secondary)",
    secondaryHover: "var(--color-secondary-hover)",
    error: "var(--color-error)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    background: "var(--color-background)",
    surface: "var(--color-surface)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textMuted: "var(--color-text-muted)",
    border: "var(--color-border)",
  },
  spacing: {
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)",
  },
  typography: {
    fontSans: "var(--font-sans)",
  }
};

export type Theme = typeof theme;
