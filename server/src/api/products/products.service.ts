import dotenv from "dotenv";
import { Prisma } from "@generated/prisma/client";
import { prisma } from "@server/prisma";
import { createProductDto } from "@server/api/products/products.dto";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@server/services/cloudinary";

dotenv.config();

const getAll = async (searchTerm?: string, isAdminFlag?: boolean) => {
  let whereConditions;
  if (searchTerm) {
    whereConditions = {
      name: { contains: searchTerm, mode: Prisma.QueryMode.insensitive },
    };
  }

  const selectAdmin = {
    id: true,
    name: true,
    imageUrl: true,
    price: true,
    stock: true,
    Categories: { select: { name: true } },
  };

  const selectPublic = {
    id: true,
    name: true,
    imageUrl: true,
    price: true,
  };

  const all = await prisma.products.findMany({
    where: whereConditions,
    select: isAdminFlag ? selectAdmin : selectPublic,
  });

  return all;
};

const getByCategoryId = async (categoryId: string) => {
  return prisma.products.findMany({
    where: { categoryId },
    select: {
      name: true,
      imageUrl: true,
      price: true,
    },
  });
};

const create = async (data: createProductDto, buffer?: Buffer) => {
  const folder = `${process.env.ROOT_FOLDER}/products-images`;

  let imageUrl: string | null = null;
  let imagePublicId: string | null = null;

  if (buffer) {
    const uploadResult = await uploadImageToCloudinary(buffer, folder);
    imageUrl = uploadResult.secure_url;
    imagePublicId = uploadResult.public_id;
  }

  await prisma.products.create({
    data: {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
      status: data.status,
      categoryId: data.categoryId,
      imageUrl,
      imagePublicId,
    },
  });
};

const getById = async (id: string) => {
  return prisma.products.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      imagePublicId: true,
      price: true,
      stock: true,
      status: true,
      Categories: { select: { id: true, name: true } },
    },
  });
};

const update = async (
  id: string,
  data: Partial<createProductDto>,
  buffer?: Buffer
) => {
  const folder = `${process.env.ROOT_FOLDER}/products-images`;

  let imageUrl: string | undefined = data.imageUrl;
  let imagePublicId: string | undefined = data.imagePublicId;

  if (buffer) {
    const uploadResult = await uploadImageToCloudinary(
      buffer,
      folder,
      imagePublicId
    );
    imageUrl = uploadResult.secure_url;
    imagePublicId = uploadResult.public_id;
  }

  await prisma.products.update({
    where: { id },
    data: {
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
      status: data.status,
      categoryId: data.categoryId,
      imageUrl,
      imagePublicId,
    },
  });
};

const remove = async (id: string) => {
  const product = await prisma.products.delete({
    where: { id },
  });
  if (product.imagePublicId) deleteImageFromCloudinary(product.imagePublicId);
};

export const ProductServices = {
  getAll,
  getByCategoryId,
  create,
  getById,
  update,
  remove,
};
