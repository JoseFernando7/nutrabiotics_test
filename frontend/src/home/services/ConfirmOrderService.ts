import { OrderRequest } from "../../shared/models/Order";

export const confirmOrder = async (order: OrderRequest): Promise<void> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. Debes iniciar sesión.");
  }

  const response = await fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  })

  if (!response.ok) {
    const errorData = await response.json();
    alert('Error al confirmar la orden, inténtalo nuevamente.');
    throw new Error(`Error al confirmar la orden: ${errorData.message}`);
  }
}
