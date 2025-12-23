'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Student from '@/app/components/Tasks/Student';
import Govt from '@/app/components/Tasks/Govt';
import JobSeekers from '@/app/components/Tasks/JobSeekers';
import { Work } from '@mui/icons-material';
const Role = () => {
    const params = useParams();
    const { role } = params;
  return (
    <div>
        {role === 'student' && <Student />}
        {role === 'government-aspirant' && <Govt />}
        {role === 'job-seeker' && <JobSeekers />}
        {role === 'Working-professional' && <Work />}
    </div>
  )
}

export default Role