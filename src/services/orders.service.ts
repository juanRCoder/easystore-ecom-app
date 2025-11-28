
const API = import.meta.env.VITE_API_DEV;

export const createOrder = async (orderData: FormData) => {
  try {
    const response = await fetch(`${API}/orders`, {
      method: "POST",
      body: orderData
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.payload.message);
    return result;
  } catch (error) {
    console.error("[createOrder]", error);
    throw error;
  }
};