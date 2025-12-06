import dotenv from "dotenv";
import { Prisma } from "@generated/prisma/client";
import { prisma } from "@server/prisma";
import { productListDto } from "@server/api/products/products.dto";
import { uploadImageToCloudinary } from "@server/services/cloudinary";
import { UploadApiResponse } from "cloudinary";

dotenv.config();

const findAllProducts = async (searchTerm?: string, isAdminFlag?: boolean) => {
  const whereConditions = searchTerm
    ? { name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive } }
    : undefined;

  const allProducts = await prisma.products.findMany({
    where: whereConditions,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true,
      stock: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return allProducts.map((p) => {
    const { category, ...rest } = p;
    return isAdminFlag
      ? { ...rest, categoryName: category.name }
      : { id: p.id, name: p.name, imageUrl: p.imageUrl, price: p.price };
  });
};

const findProductsByCategoryId = async (categoryId: string) => {
  return prisma.products.findMany({
    where: { categoryId },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      price: true,
    },
  });
};

const insertNewProduct = async (data: productListDto, buffer?: Buffer) => {
  const folder = `${process.env.ROOT_FOLDER}/products-images`;

  let imgResult: UploadApiResponse | null = null;
  if (buffer) {
    imgResult = await uploadImageToCloudinary(buffer, folder);
  }

  await prisma.products.create({
    data: {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock) || 10,
      status: data.status || "available",
      categoryId: data.categoryId || "",
      imageUrl: imgResult?.secure_url ?? null,
    },
  });
};

export const ProductServices = {
  findAllProducts,
  findProductsByCategoryId,
  insertNewProduct,
};
