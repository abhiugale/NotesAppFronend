import { Typography, TypographyProps } from "@mui/material";

interface TextProps extends TypographyProps {
  variant?: TypographyProps["variant"];
}

export default function Text({ children, variant = "body1", ...props }: TextProps) {
  return (
    <Typography variant={variant} {...props}>
      {children}
    </Typography>
  );
}
