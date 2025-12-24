'use client'
import {
  Container, Grid, Box, Typography, TextField,
  Autocomplete, Button, Chip,
  Card, CardContent, ToggleButton, ToggleButtonGroup
} from '@mui/material'
import React, { useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Autorenew,
  CheckCircle,
  DeleteOutline,
  HourglassEmpty,
  PauseCircle,
  AttachFile,
  Add,
  Work,
  TrendingUp,
  CalendarToday,
  LocationOn,
  Business,
  Description,
  PriorityHigh,
  CloudUpload,
  Cancel,
  Check,
  ArrowBack
} from '@mui/icons-material';

// Premium Glass Styling with thin borders
export const premiumGlassStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    "& fieldset": {
      borderColor: "rgba(0, 102, 204, 0.2)",
      borderWidth: 1
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 102, 204, 0.4)",
      borderWidth: 1
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 102, 204, 0.8)",
      borderWidth: 1
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(95, 109, 126, 0.8)",
    fontSize: "0.875rem",
    "&.Mui-focused": {
      color: "rgba(0, 102, 204, 0.9)",
      fontWeight: 500
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem",
    color: "rgba(26, 26, 26, 0.95)",
  }
};

const premiumColors = {
  primary: "rgba(0, 102, 204, 0.9)",
  primaryLight: "rgba(0, 102, 204, 0.1)",
  primaryBorder: "rgba(0, 102, 204, 0.3)",
  secondary: "rgba(95, 109, 126, 0.8)",
  accent: "rgba(0, 184, 148, 0.9)",
  danger: "rgba(255, 71, 87, 0.9)",
  warning: "rgba(255, 165, 0, 0.9)",
  glassWhite: "rgba(255, 255, 255, 0.95)",
  glassBorder: "rgba(255, 255, 255, 0.3)",
  glassBg: "rgba(255, 255, 255, 0.1)",
  textPrimary: "rgba(26, 26, 26, 0.95)",
  textSecondary: "rgba(95, 109, 126, 0.8)"
};

const statusOptions = [
  { value: 'Not Started', icon: <HourglassEmpty />, color: premiumColors.secondary },
  { value: 'In Progress', icon: <Autorenew />, color: premiumColors.primary },
  { value: 'On Hold', icon: <PauseCircle />, color: premiumColors.warning },
  { value: 'Completed', icon: <CheckCircle />, color: premiumColors.accent },
  { value: 'Cancelled', icon: <DeleteOutline />, color: premiumColors.danger },
];

const priorityOptions = [
  { value: 'Low', color: premiumColors.accent },
  { value: 'Medium', color: premiumColors.warning },
  { value: 'High', color: premiumColors.danger },
  { value: 'Critical', color: '#DC2626' },
];

type FormType = 'interview' | 'skills' | null;

interface GlassCardProps {
  children: React.ReactNode,
  sx? : Record<string, unknown>,
}
const GlassCard = ({ children, sx = {} }: GlassCardProps) => (
  <Card
    sx={{
      background: premiumColors.glassWhite,
      backdropFilter: 'blur(20px)',
      border: `1px solid ${premiumColors.glassBorder}`,
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0, 102, 204, 0.08)',
      ...sx
    }}
  >
    <CardContent sx={{ p: 2.5 }}>
      {children}
    </CardContent>
  </Card>
);

const JobSeekers = () => {
  const [selectedForm, setSelectedForm] = useState<FormType>('interview');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [skills, setSkills] = useState<string[]>(['React', 'TypeScript']);
  const [currentSkill, setCurrentSkill] = useState('');


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim()) {
      setSkills(prev => [...prev, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const renderInterviewForm = () => (
    <>
      {/* Main Content - Split Layout */}
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} direction="column">
            {/* Company Info Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Business sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Company Details
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Company Name"
                      placeholder="e.g., Google"
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Location"
                      placeholder="e.g., Mountain View, CA"
                      sx={premiumGlassStyle}
                      InputProps={{
                        startAdornment: <LocationOn sx={{ color: premiumColors.secondary, mr: 1, fontSize: 18 }} />,
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true,
                            sx: premiumGlassStyle,
                            InputProps: {
                              startAdornment: <CalendarToday sx={{ color: premiumColors.secondary, mr: 1, fontSize: 18 }} />,
                            }
                          }
                        }}
                        label="Interview Date"
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Task Details Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Description sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Task Details
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Task Name"
                      placeholder="e.g., System Design Prep"
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Description"
                      placeholder="Describe the task..."
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Sub Task Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary} mb={1.5}>
                  Sub Task <span style={{ color: premiumColors.secondary, fontWeight: 400 }}>(Optional)</span>
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Sub Task Name"
                      placeholder="e.g., Practice Questions"
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Sub Task Description"
                      placeholder="Describe the sub task..."
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} direction="column">
            {/* Status & Priority Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PriorityHigh sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Status & Priority
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      size="small"
                      options={statusOptions}
                      getOptionLabel={(option) => option.value}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          {...props}
                          sx={{ color: option.color }}
                        >
                          {option.icon}
                          <Typography variant="body2">{option.value}</Typography>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Status" sx={premiumGlassStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      size="small"
                      options={priorityOptions}
                      getOptionLabel={(option) => option.value}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          {...props}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: option.color,
                            }}
                          />
                          <Typography variant="body2">{option.value}</Typography>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Priority" sx={premiumGlassStyle} />
                      )}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Attachments Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CloudUpload sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Attachments
                  </Typography>
                </Box>
                <Box sx={{ mb: 1.5 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    size="small"
                    startIcon={<AttachFile />}
                    sx={{
                      borderColor: premiumColors.primaryBorder,
                      color: premiumColors.primary,
                      fontSize: '0.75rem',
                      '&:hover': {
                        borderColor: premiumColors.primary,
                        background: premiumColors.primaryLight,
                      },
                    }}
                  >
                    Upload Files
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Box>
                {attachments.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {attachments.map((file, index) => (
                      <Chip
                        key={index}
                        size="small"
                        label={file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                        onDelete={() => handleRemoveFile(index)}
                        sx={{
                          borderColor: premiumColors.primaryBorder,
                          background: premiumColors.glassWhite,
                          '& .MuiChip-deleteIcon': {
                            color: premiumColors.danger,
                            fontSize: 16,
                          },
                        }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </GlassCard>
            </Grid>

            {/* Skills Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary} mb={1.5}>
                  Skills to Highlight
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a skill (e.g., Algorithms)"
                    sx={premiumGlassStyle}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleAddSkill}
                    sx={{
                      minWidth: 40,
                      background: premiumColors.primary,
                      '&:hover': {
                        background: 'rgba(0, 102, 204, 1)',
                      },
                    }}
                  >
                    <Add />
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {skills.map((skill, index) => (
                    <Chip
                      key={index}
                      size="small"
                      label={skill}
                      onDelete={() => handleRemoveSkill(index)}
                      sx={{
                        background: premiumColors.primaryLight,
                        color: premiumColors.primary,
                        border: `1px solid ${premiumColors.primaryBorder}`,
                        fontSize: '0.75rem',
                        '& .MuiChip-deleteIcon': {
                          color: premiumColors.danger,
                          fontSize: 16,
                        },
                      }}
                    />
                  ))}
                </Box>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  const renderSkillsForm = () => (
    <>
      {/* Skills Tracking Form */}
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} direction="column">
            {/* Task Details Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Skill Details
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Task Name"
                      placeholder="e.g., React Mastery"
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Sub Task"
                      placeholder="e.g., Hooks & Context"
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Description"
                      placeholder="Describe the skill..."
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Today's Progress Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary} mb={1.5}>
                  Today's Progress
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  placeholder="What did you work on today? What challenges did you face? What progress did you make?"
                  sx={premiumGlassStyle}
                />
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} direction="column">
            {/* Tracking Period Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CalendarToday sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Tracking Period
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true,
                            sx: premiumGlassStyle,
                          }
                        }}
                        label="Start Date"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true,
                            sx: premiumGlassStyle,
                          }
                        }}
                        label="End Date"
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Status & Priority Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PriorityHigh sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Status & Priority
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      size="small"
                      options={statusOptions}
                      getOptionLabel={(option) => option.value}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          {...props}
                          sx={{ color: option.color }}
                        >
                          {option.icon}
                          <Typography variant="body2">{option.value}</Typography>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Status" sx={premiumGlassStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      size="small"
                      options={priorityOptions}
                      getOptionLabel={(option) => option.value}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          display="flex"
                          alignItems="center"
                          gap={1}
                          {...props}
                        >
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: option.color,
                            }}
                          />
                          <Typography variant="body2">{option.value}</Typography>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Priority" sx={premiumGlassStyle} />
                      )}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Attachments Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CloudUpload sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Attachments
                  </Typography>
                </Box>
                <Box sx={{ mb: 1.5 }}>
                  <Button
                    component="label"
                    variant="outlined"
                    size="small"
                    startIcon={<AttachFile />}
                    sx={{
                      borderColor: premiumColors.primaryBorder,
                      color: premiumColors.primary,
                      fontSize: '0.75rem',
                      '&:hover': {
                        borderColor: premiumColors.primary,
                        background: premiumColors.primaryLight,
                      },
                    }}
                  >
                    Upload Files
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Box>
                {attachments.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {attachments.map((file, index) => (
                      <Chip
                        key={index}
                        size="small"
                        label={file.name.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}
                        onDelete={() => handleRemoveFile(index)}
                        sx={{
                          borderColor: premiumColors.primaryBorder,
                          background: premiumColors.glassWhite,
                          '& .MuiChip-deleteIcon': {
                            color: premiumColors.danger,
                            fontSize: 16,
                          },
                        }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600} color={premiumColors.textPrimary}>
          Job Seeker Dashboard
        </Typography>
        <Typography variant="body2" color={premiumColors.textSecondary}>
          Track your interview preparation and skill development
        </Typography>
      </Box>

      {/* Form Selection Toggle */}
      <GlassCard sx={{ mb: 3 , width: '50%'}} >
        <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary} mb={2}>
          Select Tracking Type
        </Typography>
        <ToggleButtonGroup
          value={selectedForm}
          exclusive
          onChange={(_, value) => setSelectedForm(value)}
          sx={{
            width: '100%',
            '& .MuiToggleButton-root': {
              flex: 1,
              py: .5,
              borderColor: premiumColors.primaryBorder,
              color: premiumColors.secondary,
              '&.Mui-selected': {
                background: premiumColors.primary,
                color: premiumColors.glassWhite,
                '&:hover': {
                  background: 'rgba(0, 102, 204, 0.95)',
                }
              },
              '&:hover': {
                background: premiumColors.primaryLight,
              }
            }
          }}
        >
          <ToggleButton value="interview">
            <Work sx={{ mr: 1, fontSize: 10 }} />
            Interview Prep
          </ToggleButton>
          <ToggleButton value="skills">
            <TrendingUp sx={{ mr: 1, fontSize: 10 }} />
            Skills Tracking
          </ToggleButton>
        </ToggleButtonGroup>
      </GlassCard>

      {/* Form Content */}
      {selectedForm && (
        <>
          {selectedForm === 'interview' ? renderInterviewForm() : renderSkillsForm()}
          
          {/* Action Buttons */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => setSelectedForm(null)}
              sx={{
                color: premiumColors.secondary,
                '&:hover': {
                  background: 'rgba(95, 109, 126, 0.1)',
                }
              }}
            >
              Back to Selection
            </Button>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: premiumColors.primaryBorder,
                  color: premiumColors.primary,
                  '&:hover': {
                    borderColor: premiumColors.primary,
                    background: premiumColors.primaryLight,
                  }
                }}
              >
                <Cancel sx={{ mr: 0.5, fontSize: 18 }} />
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: premiumColors.primary,
                  '&:hover': {
                    background: 'rgba(0, 102, 204, 1)',
                  }
                }}
              >
                <Check sx={{ mr: 0.5, fontSize: 18 }} />
                Save {selectedForm === 'interview' ? 'Interview Prep' : 'Skill Tracking'}
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
}

export default JobSeekers;