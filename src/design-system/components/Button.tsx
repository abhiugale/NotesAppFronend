import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  variant?: "text" | "outlined" | "contained";
}

export default function Button({ children, variant = "contained", sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      sx={{
        borderRadius: 2.5,
        textTransform: "none",
        fontWeight: "600",
        boxShadow: variant === "contained" ? "0 4px 14px rgba(79, 70, 229, 0.2)" : "none",
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
