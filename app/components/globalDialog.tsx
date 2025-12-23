"use client";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  Grid,
  Card,
  CardActionArea,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import constants from "constants";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SchoolIcon from "@mui/icons-material/School";
import GavelIcon from "@mui/icons-material/Gavel";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { SelectAllRounded } from "@mui/icons-material";
type DialogType = 'Success' | 'Error' | 'Confirm' | 'FormOpen';

let showDialogFn: ((
  type: DialogType,
  message: string,
  onConfirm?: (value?: string) => void,
  options?: string[]
) => void) | undefined = undefined;

export function SuccessDialog(message: string) {
  showDialogFn?.('Success', message)
}

export function ErrorDialog(message: string) {
  showDialogFn?.('Error', message)
}

export function ConfirmDialog(message: string, onConfirm: () => void) {
  showDialogFn?.('Confirm', message, onConfirm)
}

export function formSelectionDialog(message: string, onSelect: (value?: string) => void, options: string[]) {
  showDialogFn?.('FormOpen', message, onSelect, options)
}


export default function ResponsiveDialog() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<DialogType>('Success');
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [onConfirm, setOnConfirm] = useState<(value?: string) => void>(() => { });
  const optionIconMap: Record<string, JSX.Element> = {
    student: <SchoolIcon fontSize="large" />,
    "government-aspirant": <GavelIcon fontSize="large" />,
    "job-seeker": <WorkIcon fontSize="large" />,
    professional: <BusinessCenterIcon fontSize="large" />,
  };
  const roleStyleMap: Record<
    string,
    { bg: string; border: string; glow: string }
  > = {
    student: {
      bg: "linear-gradient(135deg, rgba(59,130,246,0.18), rgba(147,197,253,0.18))",
      border: "rgba(59,130,246,0.35)",
      glow: "rgba(59,130,246,0.35)",
    },
    "government-aspirant": {
      bg: "linear-gradient(135deg, rgba(234,179,8,0.18), rgba(253,224,71,0.18))",
      border: "rgba(234,179,8,0.35)",
      glow: "rgba(234,179,8,0.35)",
    },
    "job-seeker": {
      bg: "linear-gradient(135deg, rgba(34,197,94,0.18), rgba(134,239,172,0.18))",
      border: "rgba(34,197,94,0.35)",
      glow: "rgba(34,197,94,0.35)",
    },
    professional: {
      bg: "linear-gradient(135deg, rgba(168,85,247,0.18), rgba(216,180,254,0.18))",
      border: "rgba(168,85,247,0.35)",
      glow: "rgba(168,85,247,0.35)",
    },
  };
  useEffect(() => {
    showDialogFn = (t: DialogType, msg: string, onconf?: () => void, opts?: string[]) => {
      setType(t);
      setMessage(msg);
      setOnConfirm(() => onconf);
      setOptions(opts || []);
      setOpen(true);
    }
  }, [])

  const handleClose = () => {
    setOpen(false);
  }
  const handleConfirm = () => {
    if (onConfirm) {
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
      case "FormOpen":
        return <SelectAllRounded sx={{ fontSize: 50, color: "blue" }} />;
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

          {type === 'FormOpen' && (
            <Grid>
              {
                options.map((opt) => {
                  const key = opt.toLowerCase();
                  const roleStyle = roleStyleMap[key] || {
                    bg: "transparent",
                    border: "rgba(0,0,0,0.1)",
                    glow: "rgba(0,0,0,0.1)",
                  };
                  return (
                    <Card
                      key={opt}
                      elevation={0}
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        mb: 1, // spacing between rows
                      }}
                    >
                      <CardActionArea
                        onClick={() => {
                          onConfirm(opt);
                          handleClose();
                        }}
                        sx={{
                          px: 2,
                          py: 1.2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 2,
                          background: roleStyle.bg,
                          border: `1px solid ${roleStyle.border}`,
                          transition: "all 0.25s ease",
                          minHeight: 48,
                          "&:hover": {
                            transform: "scale(1.02)",
                            boxShadow: `0 6px 20px ${roleStyle.glow}`,
                          },
                          "&:active": {
                            transform: "scale(0.98)",
                          },
                        }}
                      >
                        {/* LEFT: Icon + Text */}
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: "12px",
                              background: "rgba(255,255,255,0.25)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "text.primary",
                              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.35)",
                            }}
                          >
                            {optionIconMap[opt]}
                          </Box>

                          <Typography fontWeight={600} fontSize="0.95rem">
                            {opt.replace(/-/g, " ").toUpperCase()}
                          </Typography>
                        </Box>

                        {/* RIGHT: Arrow */}
                        <Typography sx={{ fontSize: 18, opacity: 0.6 }}>→</Typography>
                      </CardActionArea>
                    </Card>

                  )
                })
              }
            </Grid>
          )}
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

        {type !== 'FormOpen' && (
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
        )}
      </Box>
    </Dialog>
  );

}