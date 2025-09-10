import DynamicTable from '@/components/DynamicTable'
import SideBar from '@/components/SideBar'

// simulated db query
const allStudents = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  name: `Student ${i + 1}`,
}))

export default async function StudentsPage({ searchParams }: { searchParams: { page?: string } }) {
    const { page } = await searchParams
  const currentPage = Number(page) || 1
  const rowsPerPage = 9
  const totalPages = Math.ceil(allStudents.length / rowsPerPage)

  const startIndex = (currentPage - 1) * rowsPerPage
  const currentData = allStudents.slice(startIndex, startIndex + rowsPerPage)

  return (
    <div className='flex flex-row'>
      <SideBar />
      <DynamicTable
        data={currentData}
        headerTitle="Student Management"
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )
}
