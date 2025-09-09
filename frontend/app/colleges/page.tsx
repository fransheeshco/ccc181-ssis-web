import React from 'react'
import SideBar from '@/components/SideBar'
import Dashboard from '@/components/DashboardComponent'

const college = [
  { collegeCode: 'CCS', collegeName: 'College of Computer Studies'},
  { collegeCode: 'CCS', collegeName: 'College of Computer Studies'},
  { collegeCode: 'CCS', collegeName: 'College of Computer Studies'},
  { collegeCode: 'CCS', collegeName: 'College of Computer Studies'},
  { collegeCode: 'CCS', collegeName: 'College of Computer Studies'}
]

function page() {
  return (
    <>
    <div className='flex flex-row'>
      <SideBar /> 
      <Dashboard data={college} />
    </div>
      
    </>

  )
}

export default page