import { Container as MuiContainer, ContainerProps as MuiContainerProps } from "@mui/material";

interface ContainerProps extends MuiContainerProps {}

export default function Container({ children, maxWidth = "lg", sx, ...props }: ContainerProps) {
  return (
    <MuiContainer
      maxWidth={maxWidth}
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiContainer>
  );
}
