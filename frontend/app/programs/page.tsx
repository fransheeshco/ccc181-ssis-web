import SideBar from '@/components/SideBar'
import DynamicTable from '@/components/DynamicTable'

const allPrograms = Array.from({ length: 42 }, (_, i) => ({
  programCode: i + 1,
  programName: `Program ${i + 1}`,
  collegeCode: `College ${i + 1}`,
}))

export default async function ProgramPage({ searchParams }: { searchParams: { page?: string }}) {
  const { page } = await searchParams
  const currentPage = Number(page) || 1
  const rowsPerPage = 9
  const totalPages = Math.ceil(allPrograms.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentData = allPrograms.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className='flex flex-row'>
      <SideBar /> 
      <DynamicTable
        headerTitle="Program Management" 
        data={currentData}         
        currentPage={currentPage}
        totalPages={totalPages}/>
    </div>
  )
}