import {TextField,styled } from '@mui/material'


export const TextBox = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,              // smooth rounded corners
    transition: '0.3s all',       // smooth hover/focus
    backgroundColor: '#fff',      // boxed white background
    '& fieldset': {
      borderWidth: 1,             // thin border
      borderColor: '#ccc',        // default border color
    },
    '&:hover fieldset': {
      borderColor: '#003D99',        // subtle hover border
    },
    '&.Mui-focused fieldset': {
      borderColor: "#003D99", // primary focus
      borderWidth: 2,
    },
  },
  '& input': {
    padding: '10px 12px',         // smooth padding
  },
}));