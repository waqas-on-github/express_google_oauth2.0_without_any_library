/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/quotes */
import axios from "axios";

export async function getGoogleUserInfo(accessToken: string) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch Google user info");
  }
}
