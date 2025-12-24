'use client'
import {
  Container, Grid, Box, Typography, TextField,
  Autocomplete, Button, Chip, IconButton, Paper,
  Card, CardContent, Tabs, Tab, LinearProgress,
  Slider, Rating
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
  School,
  CloudUpload,
  Cancel,
  Check,
  Timer,
  NoteAdd,
  TrendingUp,
  Book,
  Assignment,
  Assessment,
  History,
  Checklist,
  Speed,
  MenuBook,
  AccessTime,
  PlaylistAddCheck,
  Psychology,
  Replay
} from '@mui/icons-material';

// Colors for each form type
const formColors = {
  syllabus: {
    primary: '#2563EB', // Blue
    secondary: '#3B82F6',
    light: 'rgba(37, 99, 235, 0.08)',
    border: 'rgba(37, 99, 235, 0.2)',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
    cardBg: 'rgba(37, 99, 235, 0.03)'
  },
  revision: {
    primary: '#7C3AED', // Purple
    secondary: '#8B5CF6',
    light: 'rgba(124, 58, 237, 0.08)',
    border: 'rgba(124, 58, 237, 0.2)',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 100%)',
    cardBg: 'rgba(124, 58, 237, 0.03)'
  }
};

// Custom styling based on active form
const getFormStyle = (formType: 'syllabus' | 'revision') => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 1,
    background: 'rgba(255, 255, 255, 0.95)',
    "& fieldset": {
      borderColor: formColors[formType].border,
      borderWidth: 1
    },
    "&:hover fieldset": {
      borderColor: formColors[formType].primary,
      borderWidth: 1
    },
    "&.Mui-focused fieldset": {
      borderColor: formColors[formType].primary,
      borderWidth: 1
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(75, 85, 99, 0.8)",
    fontSize: "0.875rem",
    fontWeight: 500,
    "&.Mui-focused": {
      color: formColors[formType].primary,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem",
    color: "rgba(31, 41, 55, 0.95)",
    fontWeight: 500,
  }
});

// Tab styling
const tabStyle = (formType: 'syllabus' | 'revision', isActive: boolean) => ({
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: isActive ? 600 : 500,
  minHeight: 44,
  color: isActive ? formColors[formType].primary : 'rgba(75, 85, 99, 0.7)',
  borderBottom: isActive ? `2px solid ${formColors[formType].primary}` : 'none',
  '&:hover': {
    color: formColors[formType].primary,
    backgroundColor: formColors[formType].light,
  }
});

// Form Card Component
interface FormCardProps {
  children: React.ReactNode;
  formType: 'syllabus' | 'revision';
  sx?: Record<string, unknown>;
}

const FormCard = ({ children, formType, sx = {} }: FormCardProps) => (
  <Card
    sx={{
      background: 'rgba(255, 255, 255, 0.98)',
      border: `1px solid ${formColors[formType].border}`,
      borderRadius: 2,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      transition: 'all 0.2s ease',
      '&:hover': {
        boxShadow: `0 4px 16px ${formColors[formType].light}`,
      },
      ...sx
    }}
  >
    <CardContent sx={{ p: 2 }}>
      {children}
    </CardContent>
  </Card>
);

// Data
const examTypeOptions = [
  'UPSC Civil Services', 'SSC CGL', 'Banking PO', 'Railway Recruitment',
  'State PSC', 'Defense Services', 'Teaching Exams', 'Other Government Exams'
];

const subjectOptions = [
  'General Studies', 'Quantitative Aptitude', 'Reasoning', 'English Language',
  'Current Affairs', 'General Knowledge', 'Mathematics', 'Computer Awareness',
  'Economics', 'Polity', 'History', 'Geography'
];

const topicOptions = [
  'Indian Constitution', 'Modern History', 'Medieval History', 'Ancient History',
  'World Geography', 'Indian Geography', 'Indian Economy', 'Science & Technology',
  'Environmental Studies', 'International Relations', 'Governance', 'Social Justice'
];

const statusOptions = [
  { value: 'Not Started', icon: <HourglassEmpty />, color: '#6B7280' },
  { value: 'In Progress', icon: <Autorenew />, color: formColors.syllabus.primary },
  { value: 'On Hold', icon: <PauseCircle />, color: '#F59E0B' },
  { value: 'Completed', icon: <CheckCircle />, color: '#10B981' },
  { value: 'Revision Needed', icon: <Replay />, color: formColors.revision.primary },
];

const priorityOptions = [
  { value: 'High Priority', color: '#DC2626' },
  { value: 'Medium Priority', color: '#F59E0B' },
  { value: 'Low Priority', color: '#10B981' },
];

const Govt = () => {
  const [activeForm, setActiveForm] = useState<'syllabus' | 'revision'>('syllabus');
  const [topics, setTopics] = useState<string[]>(['', '']);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['General Studies', 'Current Affairs']);
  const [currentSubject, setCurrentSubject] = useState('');
  const [studyHours, setStudyHours] = useState('');
  const [coverage, setCoverage] = useState(30);
  const [confidence, setConfidence] = useState(3);

  const handleAddTopic = () => {
    setTopics([...topics, '']);
  };

  const handleRemoveTopic = (index: number) => {
    setTopics(prev => prev.filter((_, i) => i !== index));
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddSubject = () => {
    if (currentSubject.trim() && !selectedSubjects.includes(currentSubject.trim())) {
      setSelectedSubjects(prev => [...prev, currentSubject.trim()]);
      setCurrentSubject('');
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSelectedSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  // Syllabus Coverage Form
  const renderSyllabusForm = () => (
    <Grid container spacing={2}>
      {/* Left Column - Exam Details & Topics */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          {/* Exam Details */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="syllabus">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <School sx={{ color: formColors.syllabus.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.syllabus.primary}>
                  Exam Details
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={examTypeOptions}
                    renderInput={(params) => (
                      <TextField {...params} label="Exam Type" sx={getFormStyle('syllabus')} />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          sx: getFormStyle('syllabus'),
                        }
                      }}
                      label="Exam Date"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Daily Study Hours"
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                    placeholder="e.g., 4 hours"
                    sx={getFormStyle('syllabus')}
                    InputProps={{
                      startAdornment: <AccessTime sx={{ color: formColors.syllabus.secondary, mr: 1, fontSize: 18 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>

          {/* Syllabus Topics */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="syllabus">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PlaylistAddCheck sx={{ color: formColors.syllabus.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={formColors.syllabus.primary}>
                    Syllabus Topics
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddTopic}
                  sx={{
                    color: formColors.syllabus.primary,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  Add Topic
                </Button>
              </Box>
              <Grid container spacing={1}>
                {topics.map((topic, index) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Autocomplete
                      size="small"
                      freeSolo
                      options={topicOptions}
                      value={topic}
                      onChange={(_, value) => handleTopicChange(index, value || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={`Topic ${index + 1}`}
                          sx={getFormStyle('syllabus')}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: topics.length > 1 && (
                              <IconButton
                                size="small"
                                onClick={() => handleRemoveTopic(index)}
                                sx={{ color: '#DC2626', mr: -0.5 }}
                              >
                                <DeleteOutline fontSize="small" />
                              </IconButton>
                            ),
                          }}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormCard>
          </Grid>

          {/* Study Plan */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="syllabus">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Assignment sx={{ color: formColors.syllabus.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.syllabus.primary}>
                  Study Plan Details
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Chapter/Module Name"
                    placeholder="e.g., Indian Polity - Constitutional Framework"
                    sx={getFormStyle('syllabus')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Learning Objectives"
                    placeholder="What you aim to achieve in this study session..."
                    sx={getFormStyle('syllabus')}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Column - Progress & Subjects */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          {/* Progress Tracking */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="syllabus">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUp sx={{ color: formColors.syllabus.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.syllabus.primary}>
                  Progress Tracking
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={500} color="rgba(75, 85, 99, 0.8)">
                        Syllabus Coverage
                      </Typography>
                      <Typography variant="caption" fontWeight={600} color={formColors.syllabus.primary}>
                        {coverage}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={coverage} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: formColors.syllabus.light,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: formColors.syllabus.primary,
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" fontWeight={500} color="rgba(75, 85, 99, 0.8)" sx={{ display: 'block', mb: 1 }}>
                      Understanding Level
                    </Typography>
                    <Rating
                      value={confidence}
                      onChange={(_, value) => setConfidence(value || 0)}
                      precision={0.5}
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: formColors.syllabus.primary,
                        }
                      }}
                    />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Key Learnings"
                    placeholder="Important concepts, formulas, facts learned..."
                    sx={getFormStyle('syllabus')}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>

          {/* Subjects Covered */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="syllabus">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MenuBook sx={{ color: formColors.syllabus.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.syllabus.primary}>
                  Subjects Covered
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
                <Autocomplete
                  size="small"
                  freeSolo
                  options={subjectOptions}
                  value={currentSubject}
                  onChange={(_, value) => setCurrentSubject(value || '')}
                  onKeyPress={handleKeyPress}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Add a subject"
                      sx={getFormStyle('syllabus')}
                    />
                  )}
                  sx={{ flex: 1 }}
                />
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleAddSubject}
                  sx={{
                    minWidth: 40,
                    background: formColors.syllabus.gradient,
                    '&:hover': {
                      background: formColors.syllabus.primary,
                    },
                  }}
                >
                  <Add />
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                {selectedSubjects.map((subject, index) => (
                  <Chip
                    key={index}
                    size="small"
                    label={subject}
                    onDelete={() => handleRemoveSubject(index)}
                    sx={{
                      background: formColors.syllabus.light,
                      color: formColors.syllabus.primary,
                      border: `1px solid ${formColors.syllabus.border}`,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      '& .MuiChip-deleteIcon': {
                        color: formColors.syllabus.primary,
                        fontSize: 16,
                      },
                    }}
                  />
                ))}
              </Box>
            </FormCard>
          </Grid>

          {/* Materials & Status */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="syllabus">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CloudUpload sx={{ color: formColors.syllabus.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.syllabus.primary}>
                  Study Materials & Status
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 1.5 }}>
                    <Button
                      component="label"
                      variant="outlined"
                      size="small"
                      startIcon={<AttachFile />}
                      sx={{
                        borderColor: formColors.syllabus.border,
                        color: formColors.syllabus.primary,
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: formColors.syllabus.primary,
                          background: formColors.syllabus.light,
                        },
                      }}
                    >
                      Upload Materials
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
                            borderColor: formColors.syllabus.border,
                            background: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 500,
                            '& .MuiChip-deleteIcon': {
                              color: formColors.syllabus.primary,
                              fontSize: 16,
                            },
                          }}
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  )}
                </Grid>
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
                        <Typography variant="body2" fontWeight={500}>{option.value}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Study Status" sx={getFormStyle('syllabus')} />
                    )}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  // Revision Form
  const renderRevisionForm = () => (
    <Grid container spacing={2}>
      {/* Left Column - Revision Details */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          {/* Revision Plan */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="revision">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <History sx={{ color: formColors.revision.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.revision.primary}>
                  Revision Plan
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Revision Cycle"
                    placeholder="e.g., Week 1 Revision, Final Revision"
                    sx={getFormStyle('revision')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                          sx: getFormStyle('revision'),
                        }
                      }}
                      label="Revision Date"
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Time Allocated"
                    value={studyHours}
                    onChange={(e) => setStudyHours(e.target.value)}
                    placeholder="e.g., 3 hours"
                    sx={getFormStyle('revision')}
                    InputProps={{
                      startAdornment: <Timer sx={{ color: formColors.revision.secondary, mr: 1, fontSize: 18 }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Autocomplete
                    size="small"
                    options={subjectOptions}
                    renderInput={(params) => (
                      <TextField {...params} label="Subject for Revision" sx={getFormStyle('revision')} />
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
                            background: formColors.revision.light,
                            color: formColors.revision.primary,
                            border: `1px solid ${formColors.revision.border}`,
                          }}
                        />
                      ))
                    }
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>

          {/* Revision Focus Areas */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="revision">
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Checklist sx={{ color: formColors.revision.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={formColors.revision.primary}>
                    Focus Areas
                  </Typography>
                </Box>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={handleAddTopic}
                  sx={{
                    color: formColors.revision.primary,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }}
                >
                  Add Area
                </Button>
              </Box>
              <Grid container spacing={1}>
                {topics.map((topic, index) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <TextField
                      fullWidth
                      size="small"
                      value={topic}
                      onChange={(e) => handleTopicChange(index, e.target.value)}
                      placeholder={`Focus Area ${index + 1}`}
                      sx={getFormStyle('revision')}
                      InputProps={{
                        endAdornment: topics.length > 1 && (
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveTopic(index)}
                            sx={{ color: '#DC2626', mr: -0.5 }}
                          >
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormCard>
          </Grid>

          {/* Previous Mistakes */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="revision">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Psychology sx={{ color: formColors.revision.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.revision.primary}>
                  Previous Mistakes Analysis
                </Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                label="Mistakes to Avoid"
                placeholder="Common errors, misunderstood concepts, tricky questions..."
                sx={getFormStyle('revision')}
              />
            </FormCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Column - Assessment & Progress */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid container spacing={2} direction="column">
          {/* Self Assessment */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="revision">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Assessment sx={{ color: formColors.revision.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.revision.primary}>
                  Self Assessment
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" fontWeight={500} color="rgba(75, 85, 99, 0.8)" sx={{ display: 'block', mb: 1 }}>
                      Confidence Level After Revision
                    </Typography>
                    <Slider
                      size="small"
                      value={coverage}
                      onChange={(_, value) => setCoverage(value as number)}
                      valueLabelDisplay="auto"
                      valueLabelFormat={(value) => `${value}%`}
                      sx={{
                        color: formColors.revision.primary,
                        '& .MuiSlider-valueLabel': {
                          backgroundColor: formColors.revision.primary,
                        }
                      }}
                    />
                  </Box>
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
                        <Typography variant="body2" fontWeight={500}>{option.value}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Revision Priority" sx={getFormStyle('revision')} />
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Key Improvements"
                    placeholder="What you've improved since last revision..."
                    sx={getFormStyle('revision')}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>

          {/* Practice & Mock Tests */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="revision">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Speed sx={{ color: formColors.revision.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.revision.primary}>
                  Practice & Mock Tests
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Mock Test Score"
                    placeholder="e.g., 85/100"
                    sx={getFormStyle('revision')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Time Management"
                    placeholder="e.g., Completed in 2.5 hours"
                    sx={getFormStyle('revision')}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={2}
                    label="Test Analysis"
                    placeholder="Weak areas identified, time management issues..."
                    sx={getFormStyle('revision')}
                  />
                </Grid>
              </Grid>
            </FormCard>
          </Grid>

          {/* Revision Notes & Materials */}
          <Grid size={{ xs: 12 }}>
            <FormCard formType="revision">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <NoteAdd sx={{ color: formColors.revision.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" fontWeight={600} color={formColors.revision.primary}>
                  Revision Notes
                </Typography>
              </Box>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    size="small"
                    multiline
                    rows={3}
                    label="Summary Notes"
                    placeholder="Concise summary, mnemonics, shortcuts..."
                    sx={getFormStyle('revision')}
                  />
                </Grid>
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
                        <Typography variant="body2" fontWeight={500}>{option.value}</Typography>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} label="Revision Status" sx={getFormStyle('revision')} />
                    )}
                  />
                </Grid>
              </Grid>
            </FormCard>
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
          Government Exam Preparation
        </Typography>
        <Typography variant="body2" color="rgba(75, 85, 99, 0.8)">
          Track syllabus coverage and revision progress effectively
        </Typography>
      </Box>

      {/* Thin Tab Selection */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 2,
          border: '1px solid rgba(229, 231, 235, 0.8)',
          background: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Tabs
          value={activeForm}
          onChange={(_, value) => setActiveForm(value)}
          variant="fullWidth"
          sx={{
            minHeight: 44,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab
            icon={<Book fontSize="small" />}
            iconPosition="start"
            label="Syllabus Coverage"
            value="syllabus"
            sx={tabStyle('syllabus', activeForm === 'syllabus')}
          />
          <Tab
            icon={<History fontSize="small" />}
            iconPosition="start"
            label="Revision Tracking"
            value="revision"
            sx={tabStyle('revision', activeForm === 'revision')}
          />
        </Tabs>
      </Paper>

      {/* Active Form Content */}
      {activeForm === 'syllabus' && renderSyllabusForm()}
      {activeForm === 'revision' && renderRevisionForm()}

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderColor: formColors[activeForm].border,
            color: formColors[activeForm].primary,
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              borderColor: formColors[activeForm].primary,
              background: formColors[activeForm].light,
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
            background: formColors[activeForm].gradient,
            fontSize: '0.875rem',
            fontWeight: 600,
            '&:hover': {
              background: formColors[activeForm].primary,
            }
          }}
        >
          <Check sx={{ mr: 0.5, fontSize: 18 }} />
          {activeForm === 'syllabus' ? 'Save Syllabus Progress' : 'Save Revision'}
        </Button>
      </Box>
    </Container>
  );
}

export default Govt;