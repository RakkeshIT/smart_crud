'use client'
import {
  Container, Grid, Box, Typography, TextField,
  Autocomplete, Button, Chip, IconButton, Paper,
  Card, CardContent, Select, MenuItem, FormControl,
  InputLabel,
  CircularProgress
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
  School,
  Description,
  PriorityHigh,
  CloudUpload,
  Cancel,
  Check,
  Timer,
  NoteAdd,
  Class,
  Subject,
  Assignment,
  TrendingUp
} from '@mui/icons-material';
import { Dayjs } from 'dayjs';
import { useCreateData } from '@/lib/apiMethods';
import { API_ENDPOINTS } from '@/services/APIEndpoints/apiEndPoints';
import { toast } from 'react-hot-toast'
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
  primary: "rgba(0, 102, 204, 0.9)", // Academic blue
  primaryLight: "rgba(0, 102, 204, 0.1)",
  primaryBorder: "rgba(0, 102, 204, 0.3)",
  secondary: "rgba(95, 109, 126, 0.8)",
  accent: "rgba(0, 184, 148, 0.9)", // Green for completed
  danger: "rgba(220, 38, 38, 0.9)", // Red for cancelled
  warning: "rgba(245, 158, 11, 0.9)", // Amber for on hold
  glassWhite: "rgba(255, 255, 255, 0.95)",
  glassBorder: "rgba(255, 255, 255, 0.3)",
  glassBg: "rgba(255, 255, 255, 0.1)",
  textPrimary: "rgba(26, 26, 26, 0.95)",
  textSecondary: "rgba(95, 109, 126, 0.8)"
};

const classOptions = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12',
  '1st Year College', '2nd Year College', '3rd Year College', '4th Year College'
];

const subjectOptions = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
  'Computer Science',
  'Economics',
  'Business Studies',
  'Accounts',
  'Literature',
  'Social Studies',
  'Languages'
];

const statusOptions = [
  { value: 'Not Started', icon: <HourglassEmpty />, color: premiumColors.secondary },
  { value: 'In Progress', icon: <Autorenew />, color: premiumColors.primary },
  { value: 'On Hold', icon: <PauseCircle />, color: premiumColors.warning },
  { value: 'Completed', icon: <CheckCircle />, color: premiumColors.accent },
  { value: 'Cancelled', icon: <DeleteOutline />, color: premiumColors.danger },
];

const priorityOptions = [
  { value: 'Low Priority', color: premiumColors.accent },
  { value: 'Medium Priority', color: premiumColors.warning },
  { value: 'High Priority', color: '#DC2626' },
  { value: 'Critical', color: '#7C2D12' },
];

interface GlassCardProps {
  children: React.ReactNode,
  sx?: Record<string, unknown>,
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

const Student = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Science']);
  const [currentSubject, setCurrentSubject] = useState('');
  const [loading, setLoading] = useState(false)
  const [studentData, setStudentData] = useState({
    studentName: '',
    class: '',
    subjects: [] as string[],
    taskName: '',
    taskDescription: '',
    dueDate: null as Dayjs | null,
    estimatedHours: '',
    status: null as any,
    priority: null as any,
    notes: '',
    topics: [] as string[],
  })
  const handleAddTopic = () => {
    setStudentData((prev) => ({ ...prev, topics: [...prev.topics, ''] }))
  };

  const handleRemoveTopic = (index: number) => {
    setStudentData((prev) => ({ ...prev, topics: prev.topics.filter((_, i) => i !== index) }))
  };

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...studentData.topics];
    newTopics[index] = value;
    setStudentData((prev) => ({ ...prev, topics: newTopics }))
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
    if (currentSubject.trim()) {
      setSubjects(prev => [...prev, currentSubject.trim()]);
      setCurrentSubject('');
    }
  };

  const handleRemoveSubject = (index: number) => {
    setSubjects(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  const handleChange = (eOrValue: React.ChangeEvent<HTMLInputElement> | unknown, fieldName?: string, index?: number) => {

    // normal input
    if (typeof eOrValue === 'object' && eOrValue !== null && 'target' in eOrValue) {
      const { name, value } = eOrValue.target as HTMLInputElement;
      setStudentData(prev => ({ ...prev, [name]: value }));
    }
    // array input
    else if (fieldName && typeof index === 'number') {
      setStudentData((prev) => {
        const updatedArray = [...(prev as any)[fieldName]]
        updatedArray[index] = eOrValue
        return {
          ...prev,
          [fieldName]: updatedArray,
        }
      })
    }
    else {
      setStudentData((prev) => ({ ...prev, [fieldName!]: eOrValue }))
    }
  }

  const handleSubmit = async (type: 'submit' | 'draft') => {
    const formData = new FormData();
    formData.append('studentName', studentData.studentName);
    formData.append('class', selectedClass);
    formData.append('subjects', JSON.stringify(subjects));
    formData.append('taskName', studentData.taskName);
    formData.append('taskDescription', studentData.taskDescription);
    formData.append(
      'dueDate',
      studentData.dueDate?.format('YYYY-MM-DD') || ''
    );
    formData.append('estimatedHours', studentData.estimatedHours);
    formData.append('status', studentData.status?.value || '');
    formData.append('priority', studentData.priority?.value || '');
    formData.append('notes', studentData.notes);
    formData.append('topics', JSON.stringify(studentData.topics));

    attachments.forEach(file => {
      formData.append('files', file);
    });
    try {
      setLoading(true)
      const endpoint = type === 'submit' ? API_ENDPOINTS.TASK.CREATE : API_ENDPOINTS.TASK.DRAFT
      const res = await useCreateData<{ status: number; message: string }>(endpoint, formData)
      console.log(res);
      if (res.status === 200) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600} color={premiumColors.textPrimary}>
          Student Task Tracking System
        </Typography>
        <Typography variant="body2" color={premiumColors.textSecondary}>
          Track your academic tasks, assignments, and study progress
        </Typography>
      </Box>

      {/* Class Selection Card */}
      <GlassCard sx={{ mb: 3, width: '50%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Class sx={{ color: premiumColors.primary, fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
            Student Information
          </Typography>
        </Box>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              size="small"
              label="Student Name"
              placeholder="Enter your name"
              value={studentData.studentName}
              onChange={handleChange}
              name="studentName"
              sx={premiumGlassStyle}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Autocomplete
              size="small"
              options={classOptions}
              value={selectedClass}
              onChange={(_, value) => setSelectedClass(value || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Class/Grade"
                  sx={premiumGlassStyle}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <School sx={{ color: premiumColors.secondary, mr: 1, fontSize: 18 }} />,
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </GlassCard>

      {/* Form Content */}
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} direction="column">
            {/* Task Details Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Assignment sx={{ color: premiumColors.primary, fontSize: 20 }} />
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
                      name="taskName"
                      value={studentData.taskName}
                      onChange={handleChange}
                      placeholder="e.g., Math Homework - Chapter 5"
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Task Description"
                      name="taskDescription"
                      value={studentData.taskDescription}
                      onChange={handleChange}
                      placeholder="Describe the task or assignment..."
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={studentData.dueDate}
                        onChange={(value) => handleChange(value, "dueDate")}
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
                        label="Due Date"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Estimated Time"
                      placeholder="e.g., 2 hours"
                      value={studentData.estimatedHours}
                      onChange={handleChange}
                      name='estimatedHours'
                      InputProps={{
                        startAdornment: <Timer sx={{ color: premiumColors.secondary, mr: 1, fontSize: 18 }} />,
                      }}
                      sx={premiumGlassStyle}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Sub Topics Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Task Breakdown
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<Add />}
                    onClick={handleAddTopic}
                    sx={{
                      color: premiumColors.primary,
                      fontSize: '0.75rem',
                    }}
                  >
                    Add Step
                  </Button>
                </Box>
                <Grid container spacing={1}>
                  {studentData.topics.map((topic, index) => (
                    <Grid size={{ xs: 12 }} key={index}>
                      <TextField
                        fullWidth
                        size="small"
                        value={topic}
                        onChange={(e) => handleChange(e.target.value, 'topics', index)}
                        placeholder={`Step ${index + 1}`}
                        sx={premiumGlassStyle}
                        InputProps={{
                          endAdornment: studentData.topics.length > 1 && (
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveTopic(index)}
                              sx={{ color: premiumColors.danger }}
                            >
                              <DeleteOutline fontSize="small" />
                            </IconButton>
                          ),
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} direction="column">
            {/* Progress Tracking Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Progress Tracking
                  </Typography>
                </Box>
                <Grid container spacing={1.5}>
                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      size="small"
                      options={statusOptions}
                      getOptionLabel={(option) => option.value}
                      value={studentData.status}
                      onChange={(e, val) => handleChange(val, 'status')}
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
                        <TextField {...params} label="Task Status" sx={premiumGlassStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Autocomplete
                      size="small"
                      options={priorityOptions}
                      getOptionLabel={(option) => option.value}
                      value={studentData.priority}
                      onChange={(e, val) => handleChange(val, 'priority')}
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
                        <TextField {...params} label="Priority Level" sx={premiumGlassStyle} />
                      )}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      multiline
                      rows={2}
                      label="Notes & Comments"
                      placeholder="Key points, difficulties, or additional notes..."
                      value={studentData.notes}
                      onChange={handleChange}
                      name='notes'
                      sx={premiumGlassStyle}
                      InputProps={{
                        startAdornment: <NoteAdd sx={{ color: premiumColors.secondary, mr: 1, alignSelf: 'flex-start', mt: 1, fontSize: 18 }} />,
                      }}
                    />
                  </Grid>
                </Grid>
              </GlassCard>
            </Grid>

            {/* Subjects Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Subject sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Subjects
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
                        sx={premiumGlassStyle}
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
                  {subjects.map((subject, index) => (
                    <Chip
                      key={index}
                      size="small"
                      label={subject}
                      onDelete={() => handleRemoveSubject(index)}
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

            {/* Study Materials Card */}
            <Grid size={{ xs: 12 }}>
              <GlassCard>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CloudUpload sx={{ color: premiumColors.primary, fontSize: 20 }} />
                  <Typography variant="subtitle1" fontWeight={600} color={premiumColors.primary}>
                    Study Materials
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
                <Typography variant="caption" color={premiumColors.secondary} sx={{ mt: 1, display: 'block' }}>
                  Upload homework, notes, assignments, or reference materials
                </Typography>
              </GlassCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          startIcon={<Cancel />}
          onClick={() => {
            setSelectedClass('');
            setStudentData({
              studentName: '',
              class: '',
              subjects: [],
              taskName: '',
              taskDescription: '',
              dueDate: null,
              estimatedHours: '',
              status: null,
              priority: null,
              notes: '',
              topics: [],
            });
            setAttachments([]);
            setSubjects(['Mathematics', 'Science']);
            setCurrentSubject('');
          }}
          sx={{
            color: premiumColors.secondary,
            '&:hover': {
              background: 'rgba(95, 109, 126, 0.1)',
            }
          }}
        >
          Clear All
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
            onClick={() => handleSubmit('draft')}
          >
            Save as Draft
          </Button>
          <Button
            variant="contained"
            sx={{
              background: premiumColors.primary,
              '&:hover': {
                background: 'rgba(0, 102, 204, 1)',
              }
            }}
            onClick={() => handleSubmit('submit')}
          >
            {
              loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <Check sx={{ mr: 0.5, fontSize: 18 }} />
              )
            }

            Save Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Student;