import { TextField, TextFieldProps } from "@mui/material";

type InputProps = Omit<TextFieldProps, "variant"> & {
  variant?: "outlined" | "filled" | "standard";
};

export default function Input({ variant = "outlined", sx, ...props }: InputProps) {
  return (
    <TextField
      variant={variant}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 3,
        },
        ...sx,
      }}
      {...props}
    />
  );
}
