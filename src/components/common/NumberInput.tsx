import { Add, Remove } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type NumberInputProps = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: "small" | "medium";
};

export default function NumberInput({
  value = 0,
  onChange,
  min = 0,
  max = 999,

  disabled = false,
  size = "small",
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const currentValue = onChange ? value : internalValue;

  const handleChange = (newValue: number) => {
    const clampedValue = Math.min(Math.max(newValue, min), max);
    if (onChange) {
      onChange(clampedValue);
    } else {
      setInternalValue(clampedValue);
    }
  };

  const handleIncrement = () => {
    handleChange(currentValue + 1);
  };

  const handleDecrement = () => {
    handleChange(currentValue - 1);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || 0;
    handleChange(newValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <IconButton
        size={size}
        onClick={handleDecrement}
        disabled={disabled || currentValue <= min}
        aria-label="decrease"
      >
        <Remove />
      </IconButton>

      <TextField
        value={currentValue}
        onChange={handleInputChange}
        size={size}
        disabled={disabled}
        inputProps={{
          min,
          max,
          step: 1,
          style: { textAlign: "center" },
        }}
        sx={{
          width: "60px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "divider",
            },
          },
        }}
      />

      <IconButton
        size={size}
        onClick={handleIncrement}
        disabled={disabled || currentValue >= max}
        aria-label="increase"
      >
        <Add />
      </IconButton>
    </Box>
  );
}
