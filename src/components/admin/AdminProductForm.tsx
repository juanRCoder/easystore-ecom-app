import {
  Button,
  DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Dialog,
  Field, FieldLabel,
  ScrollArea,
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui"
import { FormImg } from "@/components/FormImg";
import { useProducts } from "@/hooks/useProducts";
import { FormInput } from "../FormInput";
import { useEffect, useState } from "react";
import type { ProductType } from "@/types/products.type";

type AdminProductFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: 'create' | 'edit';
  id?: string;
}

export const AdminProductForm = ({ open, onOpenChange, mode = 'create', id }: AdminProductFormProps) => {
  const [, setImageFile] = useState<File | null>(null); // For image upload handling
  const [temp, setTemp] = useState<ProductType | null>(null); // Temporary state for form data
  const { data: product } = useProducts.useGetById(id || '');

  useEffect(() => {
    if (product && mode === 'edit') {
      setTemp(product.payload);
      setImageFile(product.payload.imageUrl || null);
    }
  }, [product, mode])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='flex max-h-[min(600px,90vh)] flex-col gap-0 p-0 sm:max-w-xl'
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className='contents space-y-0 text-left'>
          <DialogTitle className='border-b px-6 py-4'>{mode === 'create' ? 'Nuevo' : 'Editar'} Producto</DialogTitle>
          <ScrollArea className='flex max-h-full flex-col overflow-hidden'>
            <DialogDescription asChild>
              <div className="p-6 grid sm:grid-cols-2 gap-4">
                <FormInput
                  id="name"
                  label="Nombre"
                  defaultValue={temp?.name || ''}
                />
                <FormInput
                  id="price"
                  label="Precio"
                  type="number"
                  defaultValue={temp?.price || ''}
                />
                <FormInput
                  id="stock"
                  label="Stock"
                  type="number"
                  defaultValue={temp?.stock || ''}
                />
                <Field>
                  <FieldLabel>Estado</FieldLabel>
                  <Select defaultValue={temp?.status || 'available'}>
                    <SelectTrigger id="checkout-7j9-exp-status-f59">
                      <SelectValue placeholder="Disponible" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="unavailable">Agotado</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Categoría</FieldLabel>
                  <Select defaultValue={temp?.Categories?.name || ''}>
                    <SelectTrigger id="checkout-7j9-exp-category-f59">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bebidas">Bebidas</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                      <SelectItem value="Dulces">Dulces</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel>Imagen</FieldLabel>
                  <FormImg
                    onChange={(file) => setImageFile(file)}
                    alt="Imagen del producto"
                  />
                </Field>
              </div>
            </DialogDescription>
            <DialogFooter className='px-6 pb-6 sm:justify-end'>
              <DialogClose asChild>
                <Button variant='outline' className="cursor-pointer">
                  Salir
                </Button>
              </DialogClose>
              <Button type='button' className="cursor-pointer">
                {mode === 'create' ? 'Crear' : 'Actualizar'} Producto
              </Button>
            </DialogFooter>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
