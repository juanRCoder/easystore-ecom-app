import { useCartStore } from "@/stores/cart.store"
import type { CartItemList } from "@/types/cart.type"
import { Minus, Plus, Trash2 } from "lucide-react"

type CartItemProps = {
  item: CartItemList
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCartStore()

  const increase = () => updateQuantity(item.id, item.quantity + 1)
  const decrease = () => {
    if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1)
  }

  return (
    <div className="flex gap-3 items-start select-none">
      <div className="flex justify-center items-center rounded-xl">
        <img
          src={item.imageUrl || '/default-img.png'}
          className={`
            object-contain w-24 h-24 rounded-xl outline-1 outline-gray-200
            ${!item.imageUrl && 'opacity-50'}
          `}
        />
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="relative">
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-500">${item.price.toFixed(2)}</p>
          <Trash2 onClick={()=>removeItem(item.id)} color="#9095A0" className="absolute top-2 right-2 cursor-pointer" />
        </div>
        <div className="ml-auto flex items-center bg-gray-100 p-1 rounded-xl">
          <Plus onClick={increase} size={28} className="bg-white rounded-lg p-1 cursor-pointer" />
          <span className="px-2 font-semibold w-10 text-center select-none">{item.quantity}</span>
          <Minus onClick={decrease} size={28} color="#EC6D13" className="bg-white rounded-lg p-1 cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
