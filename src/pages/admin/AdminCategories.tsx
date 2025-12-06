import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { AdminLayout } from "@/layouts/AdminLayout"
import { AdminCategoryCard } from "@/components/admin/AdminCategoryCard"


const AdminCategories = () => {
  const navigate = useNavigate()
  return (
    <AdminLayout>
      {/* HEADER */}
      <div className='flex items-center justify-between p-4 shadow-sm z-10'>
        <ArrowLeft onClick={() => navigate('/admin/dashboard')} strokeWidth={3} className='cursor-pointer' />
        <h2 className="text-2xl text-center flex-1 font-semibold">Categorias</h2>
      </div>
      {/* CONTENT */}
      <div className="bg-gray-50 flex flex-col px-3 gap-5 py-10">
        <AdminCategoryCard />
        <AdminCategoryCard />
        <AdminCategoryCard />
        <AdminCategoryCard />
        <AdminCategoryCard />
      </div>
      <div className="px-3">
        <button className="text-white mb-4 py-3 px-3 rounded-md text-sm w-full bg-[#EC6D13] cursor-pointer">
          + Anadir Nueva Categoria
        </button>
      </div>
    </AdminLayout>
  )
}

export default AdminCategories