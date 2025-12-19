import dotenv from "dotenv";
import { prisma } from "@server/prisma";
import { UploadApiResponse } from "cloudinary";
import { orderedProductDto, createOrderDto } from "./orders.dto";
import { formatVoucherDate } from "@server/utils/date.utils";
import { uploadImageToCloudinary } from "@server/services/cloudinary";

dotenv.config();

const getAll = async () => {
  return await prisma.orders.findMany({
    select: {
      id: true,
      guestUserName: true,
      guestUserPhone: true,
      typeOfDelivery: true,
      guestUserAddress: true,
      typeOfPayment: true,
      imageVoucher: true,
      notes: true,
      total: true,
      status: true,
    },
  });
};

const create = async (
  orderData: createOrderDto,
  products: orderedProductDto[],
  buffer?: Buffer
) => {
  const folder = `${process.env.ROOT_FOLDER}/voucher-images`;

  const orderProducts = products.map((pr) => {
    return {
      productId: pr.id,
      quantity: pr.quantity,
      price: pr.price,
      subtotal: pr.price * pr.quantity,
    };
  });

  let imgResult: UploadApiResponse | null = null;
  if (buffer && orderData.typeOfPayment === "bank") {
    imgResult = await uploadImageToCloudinary(buffer, folder);
  }

  const totalProducts = orderProducts.reduce((acc, op) => acc + op.subtotal, 0);

  const orderPayload = {
    ...orderData,
    total: totalProducts,
    OrderProducts: {
      createMany: { data: orderProducts },
    },
  };
  if (imgResult) orderPayload.imageVoucher = imgResult.secure_url;

  const newOrder = await prisma.orders.create({
    data: orderPayload,
    include: {
      OrderProducts: {
        include: { Products: true },
      },
    },
  });

  const voucherProducts = newOrder?.OrderProducts.map((op) => ({
    name: op.Products.name,
    quantity: op.quantity,
    subtotal: op.subtotal,
  }));

  const deliveryCost = newOrder?.typeOfDelivery === "delivery" ? 3 : 0; // add 3 soles
  return {
    id: newOrder?.id,
    createdAt: formatVoucherDate(newOrder?.createdAt.toISOString() || ""),
    products: voucherProducts,
    subtotal: totalProducts,
    deliveryCost,
    total: (newOrder?.total ?? 0) + deliveryCost,
    guestUserName: newOrder?.guestUserName,
    typeOfDelivery: newOrder?.typeOfDelivery,
  };
};

export const OrderServices = {
  getAll,
  create,
};
