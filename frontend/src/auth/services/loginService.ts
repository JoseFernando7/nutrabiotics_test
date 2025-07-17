import { LoginRequest, LoginResponse } from "../models/Auth";
import { JwtPayload } from "../models/JwtPayload";

export const login = async (loginRequest: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  })

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
}

export const decodeJwt = (token: string): JwtPayload => {
  const base64Payload = token.split(".")[1];
  const decodedPayload = atob(base64Payload);
  return JSON.parse(decodedPayload);
}
