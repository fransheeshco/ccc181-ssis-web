import React from 'react'
import SideBar from '@/components/SideBar'
import Dashboard from '@/components/DashboardComponent'

const students = [
  { studentId: 'S001', fname: 'John', lname: 'Doe', program: 'BSCS', college: 'Engineering', gender: 'Male', yearLevel: 3 },
  { studentId: 'S002', fname: 'Jane', lname: 'Smith', program: 'BSIT', college: 'Engineering', gender: 'Female', yearLevel: 2 },
  { studentId: 'S003', fname: 'Michael', lname: 'Johnson', program: 'BSBA', college: 'Business', gender: 'Male', yearLevel: 4 },
  { studentId: 'S004', fname: 'Emily', lname: 'Davis', program: 'BSCS', college: 'Engineering', gender: 'Female', yearLevel: 1 },
  { studentId: 'S005', fname: 'William', lname: 'Brown', program: 'BSIT', college: 'Engineering', gender: 'Male', yearLevel: 2 }
]

function page() {
  return (
    <>
    <div className='flex flex-row'>
      <SideBar /> 
      <Dashboard data={students} />
    </div>
      
    </>

  )
}

export default page