import * as React from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from 'dayjs';
export default function CustomDatePicker() {
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => setStartDate(newValue)}
        slotProps={{
          textField: {
            sx: {
              width: 220, // size
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "& fieldset": {
                  borderColor: "#003D99", // default border color
                },
                "&:hover fieldset": {
                  borderColor: "#003D99", // hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#003D99", // focus border color
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#003D99", // label color
                "&.Mui-focused": {
                  color: "#003D99", // label color on focus
                },
              },
            },
          },
        }}
        renderInput={(params) => <TextField {...params} />}
      />

      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(newValue) => setEndDate(newValue)}
        slotProps={{
          textField: {
            sx: {
              width: 220,
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
                "& fieldset": {
                  borderColor: "#003D99",
                },
                "&:hover fieldset": {
                  borderColor: "#003D99",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#003D99",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root": {
                color: "#003D99",
                "&.Mui-focused": {
                  color: "#003D99",
                },
              },
            },
          },
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
