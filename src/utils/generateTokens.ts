/* eslint-disable @typescript-eslint/quotes */
import jwt from "jsonwebtoken";

export function generateJwt(payload: object): string {
  const result = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  console.log("jwt token generated", result);

  return result;
}

export function verifyJwt(token: string): object | string {
  const result = jwt.verify(token, process.env.JWT_SECRET!);
  console.log("jwt token generated", result);

  return result;
}
