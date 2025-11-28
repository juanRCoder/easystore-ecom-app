import type { CartItemList } from "@/types/cart.type";
import { z } from "zod";

export const schemaCheckoutForm = z
  .object({
    guestUserName: z.string().min(1, "Nombre de cliente obligatorio!"),
    guestUserPhone: z.string().min(1, "Telefono de cliente obligatorio!"),
    typeOfDelivery: z.string().min(1, "Tipo de entrega obligatorio!"),
    guestUserAddress: z.string().optional(),
    typeOfPayment: z.string().min(1, "Tipo de pago obligatorio!"),
    imageVoucher: z.any().optional().nullable(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.typeOfDelivery === "delivery") {
        return Boolean(data.guestUserAddress?.trim().length);
      }
      return true;
    },
    {
      path: ["guestUserAddress"],
      message: "Dirección domiciliaria obligatoria!",
    }
  );

export type TypeCheckoutForm = z.infer<typeof schemaCheckoutForm>;
export type TypeCheckout = TypeCheckoutForm & {
  products: Omit<CartItemList, "name" | "imageUrl">[];
};
