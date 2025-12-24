'use client'
import {
  Container, Grid, Box, Typography, TextField,
  Autocomplete, Button, Chip, IconButton, Paper,
  Card, CardContent, Tabs, Tab, Divider, Slider,
  LinearProgress, AvatarGroup, Avatar
} from '@mui/material'
import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
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
  CalendarToday,
  Description,
  PriorityHigh,
  CloudUpload,
  Cancel,
  Check,
  Timer,
  NoteAdd,
  TrendingUp,
  Work,
  RocketLaunch,
  Lightbulb,
  Groups,
  Assessment,
  Timeline,
  Speed,
  VerifiedUser,
  Star,
  EmojiEvents,
  Psychology,
  Code,
  DesignServices,
  Analytics,
  Terminal,
  MenuBook,
  Podcasts,
  VideoLibrary,
  Article,
  School,
  Folder,
  Today,
  NextWeek,
  AccessTime,
  DoneAll,
  MoreHoriz,
  Person
} from '@mui/icons-material';

// Premium Gradient Colors
const professionalColors = {
  // Gradient colors for Current Project Tracking
  project: {
    primary: '#4F46E5', // Indigo
    secondary: '#8B5CF6', // Violet
    light: 'rgba(79, 70, 229, 0.1)',
    border: 'rgba(79, 70, 229, 0.3)',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
    cardGradient: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)'
  },
  // Gradient colors for Daily Knowledge Tracking
  knowledge: {
    primary: '#10B981', // Emerald
    secondary: '#34D399', // Green
    light: 'rgba(16, 185, 129, 0.1)',
    border: 'rgba(16, 185, 129, 0.3)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    cardGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(52, 211, 153, 0.05) 100%)'
  },
  // Gradient colors for Upcoming Projects Planning
  planning: {
    primary: '#F59E0B', // Amber
    secondary: '#FBBF24', // Yellow
    light: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.3)',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    cardGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)'
  }
};

// Custom Styling based on active form
const getFormStyle = (formType: string) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    "& fieldset": {
      borderColor: professionalColors[formType as keyof typeof professionalColors].border,
      borderWidth: 1
    },
    "&:hover fieldset": {
      borderColor: professionalColors[formType as keyof typeof professionalColors].primary,
      borderWidth: 1
    },
    "&.Mui-focused fieldset": {
      borderColor: professionalColors[formType as keyof typeof professionalColors].primary,
      borderWidth: 1
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(75, 85, 99, 0.8)",
    fontSize: "0.875rem",
    fontWeight: 500,
    "&.Mui-focused": {
      color: professionalColors[formType as keyof typeof professionalColors].primary,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem",
    color: "rgba(31, 41, 55, 0.95)",
    fontWeight: 500,
  }
});

// Tab styling
const tabStyle = (formType: string, isActive: boolean) => ({
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: isActive ? 600 : 500,
  color: isActive ? professionalColors[formType as keyof typeof professionalColors].primary : 'rgba(75, 85, 99, 0.7)',
  borderBottom: isActive ? `2px solid ${professionalColors[formType as keyof typeof professionalColors].primary}` : 'none',
  '&:hover': {
    color: professionalColors[formType as keyof typeof professionalColors].primary,
    backgroundColor: professionalColors[formType as keyof typeof professionalColors].light,
  }
});

// Glass Card with gradient
const ProfessionalCard = ({ children, formType, sx = {} }: any) => {
  const colors = professionalColors[formType as keyof typeof professionalColors];
  return (
    <Card
      sx={{
        background: colors.cardGradient,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${colors.border}`,
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: `0 8px 32px ${colors.light}`,
        },
        ...sx
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {children}
      </CardContent>
    </Card>
  );
};

// Status options for each form type
const projectStatusOptions = [
  { value: 'Planning', icon: <Timeline />, color: professionalColors.planning.primary },
  { value: 'In Progress', icon: <Autorenew />, color: professionalColors.project.primary },
  { value: 'Review', icon: <Assessment />, color: '#8B5CF6' },
  { value: 'Completed', icon: <CheckCircle />, color: professionalColors.knowledge.primary },
  { value: 'On Hold', icon: <PauseCircle />, color: '#F59E0B' },
];

const knowledgeTypeOptions = [
  { value: 'Technical Skill', icon: <Code />, color: professionalColors.project.primary },
  { value: 'Soft Skill', icon: <Psychology />, color: professionalColors.knowledge.primary },
  { value: 'Industry Knowledge', icon: <Analytics />, color: '#4F46E5' },
  { value: 'Tool/Software', icon: <Terminal />, color: '#10B981' },
  { value: 'Certification', icon: <VerifiedUser />, color: '#F59E0B' },
];

const planningPriorityOptions = [
  { value: 'Critical', color: '#DC2626' },
  { value: 'High', color: '#F59E0B' },
  { value: 'Medium', color: '#3B82F6' },
  { value: 'Low', color: '#10B981' },
];

const resourceOptions = ['Designer', 'Developer', 'QA Engineer', 'Product Manager', 'DevOps', 'Data Analyst'];
const techStackOptions = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'MongoDB'];
const learningFormatOptions = ['Article', 'Video', 'Course', 'Podcast', 'Documentation', 'Workshop'];

const ProfessionalDashboard = () => {
  const [activeForm, setActiveForm] = useState<'project' | 'knowledge' | 'planning'>('project');
  const [progress, setProgress] = useState(30);
  const [teamMembers, setTeamMembers] = useState(['John Doe', 'Jane Smith', 'Alex Johnson']);
  const [techStack, setTechStack] = useState(['React', 'Node.js']);
  const [currentTech, setCurrentTech] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [timeSpent, setTimeSpent] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTech = () => {
    if (currentTech.trim() && !techStack.includes(currentTech.trim())) {
      setTechStack(prev => [...prev, currentTech.trim()]);
      setCurrentTech('');
    }
  };

  const handleRemoveTech = (index: number) => {
    setTechStack(prev => prev.filter((_, i) => i !== index));
  };

  const renderCurrentProjectForm = () => (
    <Grid container spacing={2}>
      {/* Top Section - Project Overview */}
      <Grid size={{ xs: 12 }}>
        <ProfessionalCard formType="project">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Work sx={{ color: professionalColors.project.primary, fontSize: 22 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.project.primary}>
                  Project Overview
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Project Name"
                    placeholder="e.g., E-commerce Platform Redesign"
                    sx={getFormStyle('project')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Client/Company"
                    placeholder="e.g., TechCorp Inc."
                    sx={getFormStyle('project')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Project Description"
                    placeholder="Brief description of the project goals and objectives..."
                    sx={getFormStyle('project')}
                  />
                </Grid>
              </Grid>
            </Grid>
           
          </Grid>
        </ProfessionalCard>
      </Grid>

      {/* Middle Section - Timeline & Details */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="project">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Timeline sx={{ color: professionalColors.project.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.project.primary}>
                  Timeline & Milestones
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          sx: getFormStyle('project'),
                        }
                      }}
                      label="Start Date"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          sx: getFormStyle('project'),
                        }
                      }}
                      label="Deadline"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Next Milestone"
                    placeholder="e.g., Complete API Integration"
                    sx={getFormStyle('project')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Current Blockers"
                    placeholder="Any challenges or blockers..."
                    sx={getFormStyle('project')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="project">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Speed sx={{ color: professionalColors.project.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.project.primary}>
                  Tech Stack
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                <Autocomplete
                  size="small"
                  freeSolo
                  options={techStackOptions}
                  value={currentTech}
                  onChange={(_, value) => setCurrentTech(value || '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Add technology"
                      sx={getFormStyle('project')}
                    />
                  )}
                  sx={{ flex: 1 }}
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleAddTech}
                  sx={{
                    minWidth: 40,
                    background: professionalColors.project.gradient,
                    '&:hover': {
                      background: professionalColors.project.primary,
                    },
                  }}
                >
                  <Add />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {techStack.map((tech, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={tech}
                    onDelete={() => handleRemoveTech(index)}
                    sx={{
                      background: professionalColors.project.light,
                      color: professionalColors.project.primary,
                      border: `1px solid ${professionalColors.project.border}`,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      '& .MuiChip-deleteIcon': {
                        color: professionalColors.project.primary,
                        fontSize: 16,
                      },
                    }}
                  />
                ))}
              </Box>
            </ProfessionalCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section - Status & Resources */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="project">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Assessment sx={{ color: professionalColors.project.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.project.primary}>
                  Status & Resources
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={projectStatusOptions}
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
                        <Typography variant="body2" fontWeight={500}>{option.value}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Status" sx={getFormStyle('project')} />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={resourceOptions}
                    renderInput={(params) => (
                      <TextField {...params} label="Required Resources" sx={getFormStyle('project')} />
                    )}
                    multiple
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          label={option}
                          size="small"
                          {...getTagProps({ index })}
                          sx={{
                            background: professionalColors.project.light,
                            color: professionalColors.project.primary,
                            border: `1px solid ${professionalColors.project.border}`,
                          }}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Budget Estimate"
                    placeholder="e.g., $15,000 - $20,000"
                    sx={getFormStyle('project')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="project">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CloudUpload sx={{ color: professionalColors.project.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.project.primary}>
                  Documents & Files
                </Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  startIcon={<AttachFile />}
                  sx={{
                    borderColor: professionalColors.project.border,
                    color: professionalColors.project.primary,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: professionalColors.project.primary,
                      background: professionalColors.project.light,
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
                        borderColor: professionalColors.project.border,
                        background: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                          color: professionalColors.project.primary,
                          fontSize: 16,
                        },
                      }}
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            </ProfessionalCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderDailyKnowledgeForm = () => (
    <Grid container spacing={2}>
      {/* Top Section - Learning Focus */}
      <Grid size={{ xs: 12 }}>
        <ProfessionalCard formType="knowledge">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Lightbulb sx={{ color: professionalColors.knowledge.primary, fontSize: 22 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.knowledge.primary}>
                  Today's Learning Focus
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Learning Topic"
                    placeholder="e.g., Advanced React Patterns"
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Autocomplete
                    size="small"
                    options={knowledgeTypeOptions}
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
                        <Typography variant="body2" fontWeight={500}>{option.value}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Learning Type" sx={getFormStyle('knowledge')} />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Time Spent"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(e.target.value)}
                    placeholder="e.g., 2 hours"
                    InputProps={{
                      startAdornment: <AccessTime sx={{ color: professionalColors.knowledge.secondary, mr: 1, fontSize: 18 }} />,
                    }}
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
              </Grid>
            </Grid>
           
          </Grid>
        </ProfessionalCard>
      </Grid>

      {/* Middle Section - Learning Details */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="knowledge">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MenuBook sx={{ color: professionalColors.knowledge.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.knowledge.primary}>
                  Learning Resources
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Resource Title"
                    placeholder="e.g., React Documentation - Advanced Guides"
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Resource URL"
                    placeholder="https://..."
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={learningFormatOptions}
                    renderInput={(params) => (
                      <TextField {...params} label="Format" sx={getFormStyle('knowledge')} />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Key Takeaways"
                    placeholder="What did you learn? Key insights..."
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section - Progress & Notes */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="knowledge">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp sx={{ color: professionalColors.knowledge.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.knowledge.primary}>
                  Progress & Application
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="caption" fontWeight={500} color="rgba(75, 85, 99, 0.8)" sx={{ display: 'block', mb: 1 }}>
                      Confidence Level
                    </Typography>
                    <Slider
                      size="small"
                      defaultValue={50}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      sx={{
                        color: professionalColors.knowledge.primary,
                        '& .MuiSlider-valueLabel': {
                          backgroundColor: professionalColors.knowledge.primary,
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="How will you apply this?"
                    placeholder="Practical applications in current projects..."
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Next Learning Step"
                    placeholder="What to learn next on this topic..."
                    sx={getFormStyle('knowledge')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderUpcomingProjectsForm = () => (
    <Grid container spacing={2}>
      {/* Top Section - Project Idea */}
      <Grid size={{ xs: 12 }}>
        <ProfessionalCard formType="planning">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <RocketLaunch sx={{ color: professionalColors.planning.primary, fontSize: 22 }} />
            <Typography variant="subtitle1" fontWeight={600} color={professionalColors.planning.primary}>
              New Project Planning
            </Typography>
          </Box>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Project Title"
                placeholder="e.g., AI-Powered Analytics Dashboard"
                sx={getFormStyle('planning')}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Estimated Value"
                placeholder="e.g., $50,000 - $75,000"
                sx={getFormStyle('planning')}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="Project Vision"
                placeholder="Brief description of the project vision and goals..."
                sx={getFormStyle('planning')}
              />
            </Grid>
          </Grid>
        </ProfessionalCard>
      </Grid>

      {/* Middle Section - Planning Details */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="planning">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CalendarToday sx={{ color: professionalColors.planning.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.planning.primary}>
                  Timeline Planning
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          sx: getFormStyle('planning'),
                        }
                      }}
                      label="Target Start Date"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Estimated Duration"
                    placeholder="e.g., 3-6 months"
                    sx={getFormStyle('planning')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Key Milestones"
                    placeholder="List major milestones (separate with commas)"
                    sx={getFormStyle('planning')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="planning">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Groups sx={{ color: professionalColors.planning.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.planning.primary}>
                  Resource Requirements
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Team Size"
                    placeholder="e.g., 3-5 members"
                    sx={getFormStyle('planning')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={resourceOptions}
                    renderInput={(params) => (
                      <TextField {...params} label="Required Roles" sx={getFormStyle('planning')} />
                    )}
                    multiple
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          label={option}
                          size="small"
                          {...getTagProps({ index })}
                          sx={{
                            background: professionalColors.planning.light,
                            color: professionalColors.planning.primary,
                            border: `1px solid ${professionalColors.planning.border}`,
                          }}
                        />
                      ))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Technology Stack"
                    placeholder="e.g., MERN Stack, AWS"
                    sx={getFormStyle('planning')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section - Analysis & Priority */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="planning">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Analytics sx={{ color: professionalColors.planning.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.planning.primary}>
                  Risk & Opportunity Analysis
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Potential Risks"
                    placeholder="Identify potential challenges and risks..."
                    sx={getFormStyle('planning')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Opportunities"
                    placeholder="Potential benefits and opportunities..."
                    sx={getFormStyle('planning')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={planningPriorityOptions}
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
                        <Typography variant="body2" fontWeight={500}>{option.value}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Priority" sx={getFormStyle('planning')} />
                    )}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <ProfessionalCard formType="planning">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Star sx={{ color: professionalColors.planning.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={professionalColors.planning.primary}>
                  Success Metrics
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="KPIs & Metrics"
                    placeholder="Key performance indicators to track..."
                    sx={getFormStyle('planning')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Success Criteria"
                    placeholder="What defines project success?"
                    sx={getFormStyle('planning')}
                  />
                </Grid>
              </Grid>
            </ProfessionalCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="rgba(31, 41, 55, 0.95)">
          Professional Dashboard
        </Typography>
        <Typography variant="body2" color="rgba(75, 85, 99, 0.8)">
          Track your projects, knowledge, and upcoming plans
        </Typography>
      </Box>

      {/* Thin Tab Selection */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 2,
          border: '1px solid rgba(229, 231, 235, 0.8)',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Tabs
          value={activeForm}
          onChange={(_, value) => setActiveForm(value)}
          variant="fullWidth"
          sx={{
            minHeight: 48,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab
            icon={<Work fontSize="small" />}
            iconPosition="start"
            label="Current Projects"
            value="project"
            sx={tabStyle('project', activeForm === 'project')}
          />
          <Tab
            icon={<Lightbulb fontSize="small" />}
            iconPosition="start"
            label="Knowledge Tracking"
            value="knowledge"
            sx={tabStyle('knowledge', activeForm === 'knowledge')}
          />
          <Tab
            icon={<RocketLaunch fontSize="small" />}
            iconPosition="start"
            label="Upcoming Planning"
            value="planning"
            sx={tabStyle('planning', activeForm === 'planning')}
          />
        </Tabs>
      </Paper>

      {/* Active Form Content */}
      {activeForm === 'project' && renderCurrentProjectForm()}
      {activeForm === 'knowledge' && renderDailyKnowledgeForm()}
      {activeForm === 'planning' && renderUpcomingProjectsForm()}

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: professionalColors[activeForm].border,
            color: professionalColors[activeForm].primary,
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              borderColor: professionalColors[activeForm].primary,
              background: professionalColors[activeForm].light,
            }
          }}
        >
          <Cancel sx={{ mr: 0.5, fontSize: 18 }} />
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            background: professionalColors[activeForm].gradient,
            fontSize: '0.875rem',
            fontWeight: 600,
            '&:hover': {
              background: professionalColors[activeForm].primary,
            }
          }}
        >
          <Check sx={{ mr: 0.5, fontSize: 18 }} />
          {activeForm === 'project' && 'Save Project'}
          {activeForm === 'knowledge' && 'Log Learning'}
          {activeForm === 'planning' && 'Save Plan'}
        </Button>
      </Box>
    </Container>
  );
}

export default ProfessionalDashboard;