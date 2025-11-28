import { createOrder } from "@/services/orders.service";
import type { VoucherType } from "@/types/orders.type";
import { useMutation } from "@tanstack/react-query";

type UseCreateOrderProps = {
  onSuccess?: (data: { success: boolean; payload: VoucherType }) => void;
  onError?: (message: string) => void;
};

export const useCreateOrder = ({ onSuccess, onError }: UseCreateOrderProps) => {
  return useMutation({
    mutationFn: async (orderData: FormData) => createOrder(orderData),
    onSuccess(data) {
      if (onSuccess) onSuccess(data);
    },
    onError(error) {
      if (onError) onError(error instanceof Error ? error.message : String(error));
    },
  });
};
