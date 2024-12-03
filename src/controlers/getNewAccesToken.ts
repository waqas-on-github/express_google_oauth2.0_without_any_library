/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/quotes
import axios from "axios";

export async function refreshAccessToken(refreshToken: string) {
  try {
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      null,
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
          grant_type: "refresh_token", // Indicates that this is a refresh token request
        },
      }
    );

    const newAccessToken = response.data.access_token;
    console.log("New Access Token:", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}
