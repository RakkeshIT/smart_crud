import React from 'react'
import DashboardLayoutWrapper from '../components/layouts/DashboardLayout'
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <DashboardLayoutWrapper>
        {children}
    </DashboardLayoutWrapper>
  )
}

export default layout