import { createHash } from "crypto";
import RefreshToken from "../models/refreshToken.js";

const generateAccessAndRefreshTokens = async (user, req) => {
  
  const accessToken = user.generateAccessToken();

  
  const refreshToken = user.generateRefreshToken();

  
  const tokenHash = createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  //expiry
  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  // store hashed refresh token
  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt,
    userAgent: req.get("user-agent"),
    ip: req.ip,
  });

  return { accessToken, refreshToken, };
};

export default generateAccessAndRefreshTokens;