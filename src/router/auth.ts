/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Router } from "express";
import dotenv from "dotenv";
import { googleAuthCallback } from "../controlers/authControler";
import { profileControler } from "../controlers/profleControler";
import { authenticateJwt } from "../middlewares/authorizeUser";
dotenv.config();

export const router = Router();
console.log("auth router hittttt");

// Redirect user to Google Login
router.get("/google", (req, res) => {
  const scope = "email profile";
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.CALLBACK_URL}&scope=${scope}`;
  console.log("auturl to be reddirected");

  console.log(authUrl);
  console.log("auturl to be reddirected");

  res.redirect(authUrl);
});

// Handle callback from Google with authorization code
router.get("/callback", googleAuthCallback);
router.get("/profile", authenticateJwt, profileControler);
