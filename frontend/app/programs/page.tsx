import React from 'react'
import SideBar from '@/components/SideBar'
import Dashboard from '@/components/DashboardComponent'

const programs = [
  { programCode: "BSCS", programName: "Bachelors of Science in Computer Science", collegeCode: "CCS" },
  { programCode: "BSCS", programName: "Bachelors of Science in Computer Science", collegeCode: "CCS" },
  { programCode: "BSCS", programName: "Bachelors of Science in Computer Science", collegeCode: "CCS" },
  { programCode: "BSCS", programName: "Bachelors of Science in Computer Science", collegeCode: "CCS" },
  { programCode: "BSCS", programName: "Bachelors of Science in Computer Science", collegeCode: "CCS" }
]

function page() {
  return (
    <>
    <div className='flex flex-row'>
      <SideBar /> 
      <Dashboard data={programs} />
    </div>
      
    </>

  )
}

export default page