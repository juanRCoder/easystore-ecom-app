import { Package } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Button } from './ui';

interface ImageUploadProps {
  alt: string
  onChange?: (file: File | null) => void
}

export const FormImg = ({ alt, onChange }: ImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string>('')
  const fileRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))
    onChange?.(file)
  }

  const handleRemoveImage = () => {
    setImagePreview("");
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    onChange?.(null)
  };


  return (
    <>
      <div
        onClick={() => fileRef.current?.click()}
        className="w-full h-48 border border-border border-dashed flex items-center justify-center cursor-pointer"
      >
        {imagePreview ? (
          <img src={imagePreview} alt={alt} className="object-cover h-full p-4" />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Package size={44} className='text-border' />
            <span className="">Agregar imagen del producto</span>
          </div>
        )}
      </div>
      {imagePreview &&
        <Button variant={'outline'} onClick={handleRemoveImage} className="cursor-pointer mt-2">
          Remover imagen
        </Button>}
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}