import { DecodedToken } from "../models/DecodedToken";

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload) as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}