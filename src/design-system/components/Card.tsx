import { Card as MuiCard, CardProps as MuiCardProps } from "@mui/material";

interface CardProps extends MuiCardProps {}

export default function Card({ children, sx, ...props }: CardProps) {
  return (
    <MuiCard
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 20px rgba(0, 0, 0, 0.05)",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
}
