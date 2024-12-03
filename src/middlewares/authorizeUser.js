/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
import { verifyJwt } from "../utils/generateTokens";

export function authenticateJwt(req, res, next) {
  console.log("middleware hit");

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const decoded = verifyJwt(token);
    req.user = decoded; // TypeScript will now recognize this property

    next();
  } catch (error) {
    res.status(401).send("Invalid or expired token");
  }
}
