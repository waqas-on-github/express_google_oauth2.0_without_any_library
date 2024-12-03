/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { Request, Response } from "express";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { getGoogleUserInfo } from "../utils/getgoogleUserInfo";
import { generateJwt } from "../utils/generateTokens";

const prisma = new PrismaClient();
//user agreed and clicked on signup with google then
export async function googleAuthCallback(req: Request, res: Response) {
  console.log("google auth callbacke  contrler hit");

  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send("Authorization code is missing");
  }

  console.log("got the code from google to get access");

  try {
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.CALLBACK_URL,
        grant_type: "authorization_code",
        access_type: "offline",
      }
    );

    const { access_token } = tokenResponse.data;
    const userInfo = await getGoogleUserInfo(access_token);

    const existingUser = await prisma.user.findUnique({
      where: { googleId: userInfo.sub },
    });

    let user;
    if (!existingUser) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.sub as string,
          email: userInfo.email as string,
          name: userInfo.name as string,
          emailVerified: userInfo.email_verified,
          picture: userInfo.picture,
        },
      });
    } else {
      user = existingUser;
    }

    const jwtToken = generateJwt({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    res.json({ jwtToken });
  } catch (error) {
    console.log(error);

    res.status(500).send("Failed to handle Google OAuth callback");
  }
}
