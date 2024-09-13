import { User } from "@/types/user";

export const decodeJWT = (jwtToken: string): User => {
  const [header, payload, signature] = jwtToken.split(".");

  const correctedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");

  const binaryData = Uint8Array.from(atob(correctedPayload), (c) =>
    c.charCodeAt(0)
  );

  const decodedPayload = new TextDecoder("utf-8").decode(binaryData);

  const parsedPayload = JSON.parse(decodedPayload);

  return parsedPayload;
};
