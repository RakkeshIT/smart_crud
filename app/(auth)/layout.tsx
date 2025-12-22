import React from 'react'
import Header from '../components/layouts/Header'
import Style from './authglobal.module.css'
const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className={Style.container}>
        {children}
    </div>
  )
}

export default layout