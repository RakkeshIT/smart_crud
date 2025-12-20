"use client";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box
} from "@mui/material";
import Button from "@mui/material/Button";
import constants from "constants";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
type DialogType =  'Success' | 'Error' | 'Confirm';

let showDialogFn : ((
    type: DialogType,
    message: string,
    onConfirm? : () => void) => void) | undefined = undefined;

export function SuccessDialog(message: string){
    showDialogFn?.('Success', message)
}

export function ErrorDialog(message: string){
    showDialogFn?.('Error', message)
}

export function ConfirmDialog(message: string, onConfirm: () => void){
    showDialogFn?.('Confirm', message, onConfirm)
}

export default function ResponsiveDialog() {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState<DialogType>('Success');
    const [message, setMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

    useEffect(() => {
        showDialogFn = (t: DialogType, msg: string, onconf? : () => void) => {
            setType(t);
            setMessage(msg);
            setOnConfirm(() => onconf);
            setOpen(true);
        }
    }, [])

    const handleClose = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        if(onConfirm){
            onConfirm();
        }

        handleClose()

    } 

    const renderIcon = () => {
    switch (type) {
      case "Success":
        return <CheckCircleIcon sx={{ fontSize: 50, color: "green" }} />;
      case "Error":
        return <ErrorOutlineIcon sx={{ fontSize: 50, color: "red" }} />;
      case "Confirm":
        return <HelpOutlineIcon sx={{ fontSize: 50, color: "orange" }} />;
    }
  };
    
   return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          borderRadius: 1.5,
          p: 2,
          minWidth: 500,
          boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 0,
        }}
      >
        {renderIcon()}
        <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
          {type}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "1rem", color: "text.secondary" }}>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", gap: 1 }}>
          {type === "Confirm" && (
            <Button
              onClick={onConfirm}
              variant="contained"
              color="primary"
              sx={{ minWidth: 100 }}
            >
              Confirm
            </Button>
          )}
          <Button
            onClick={handleClose}
            variant={type === "Confirm" ? "outlined" : "contained"}
            color={type === "Error" ? "error" : "primary"}
            sx={{ minWidth: 100 }}
          >
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );

}