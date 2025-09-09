import React from 'react'
import SideBar from '@/components/SideBar'
import Dashboard from '@/components/DashboardComponent'

function page() {
  return (
    <>
    <div className='flex flex-row'>
      <SideBar /> 
      <Dashboard />
    </div>
      
    </>

  )
}

export default page