import { Edit2, Trash2 } from "lucide-react"

export const AdminCategoryCard = () => {
  return (
    <div className='bg-white rounded-md shadow flex items-center justify-between px-5 py-3'>
      <p className="font-medium">Bebidas</p>
      <div className="flex gap-3">
        <span className="cursor-pointer p-3 rounded-full hover:bg-gray-100">
          <Edit2 />
        </span>
        <span className="cursor-pointer p-3 rounded-full hover:bg-gray-100">
          <Trash2 />
        </span>
      </div>
    </div>
  )
}
