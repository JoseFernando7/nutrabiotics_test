import { RegisterRequest, RegisterResponse } from "../models/Auth";

export const registerService = async (registerRequest: RegisterRequest): Promise<RegisterResponse> => {
  const response = await fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerRequest),
  })

  if (!response.ok) {
    const errorData: { message: string } = await response.json();
    throw new Error(errorData.message || 'Error en el registro');
  }

  const data: RegisterResponse = await response.json();
  return data;
}
