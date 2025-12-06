export interface productListDto {
  id?: string
  name: string
  price: number
  stock?: number
  status?: string
  imageUrl: string | null
  categoryId?: string
  categoryName?: string
}