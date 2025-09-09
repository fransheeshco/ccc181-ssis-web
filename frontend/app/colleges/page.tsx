import SideBar from '@/components/SideBar'
import Dashboard from '@/components/DynamicTable'
import DynamicTable from '@/components/DynamicTable'

const allCollege = Array.from({ length: 42 }, (_, i) => ({
  collegeCode: i + 1,
  collegeName: `College ${i + 1}`,
}))

export default async function CollegePage({ searchParams }: { searchParams: { page?: string } }) {  
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const rowsPerPage = 9
  const totalPages = Math.ceil(allCollege.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentData = allCollege.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className='flex flex-row'>
      <SideBar /> 
      <DynamicTable 
        headerTitle='College Management' 
        page={currentPage} 
        totalPages={totalPages} 
        data={currentData} />
    </div>
  )
}