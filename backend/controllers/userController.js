import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createHash } from "crypto";
import asyncHandler from "../middlewares/asnycHandler.js";
import { error, log } from "console";
import { sendEmail, emailVerificationMailgenContent,forgotPasswordMailgenContent } from "../services/email.service.js";
import generateAccessAndRefreshTokens from "../services/token.service.js";
import RefreshToken from "../models/refreshToken.js";

const createUser = asyncHandler(async (req,res) => {
  const {username, email, password} = req.body;

   if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }


  const userExist = await User.findOne({email})
  if(userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the user password
  const newUser = new User({ username , email , password })

  const { unHashedToken, hashedToken, tokenExpiry, } = newUser.generateTemporaryToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationExpires = tokenExpiry;


  try{
      await newUser.save();

      const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${unHashedToken}`;

      await sendEmail({
        to: newUser.email,
        subject: "Verify your Movie App email",
        mailgenContent: emailVerificationMailgenContent(
          newUser.username,
          verificationUrl
        ),
      });

      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        isVerified: newUser.isVerified,
        message: "Registration successful. Please verify your email.",
      });
  } catch (error) {
    console.error(error);

    res.status(500);
    throw new Error("invalid user crediantials");
  }

});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    res.status(400);
    throw new Error("Verification token is required");
  }

  const hashedToken = createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: {
      $gt: new Date(),
    },
  }).select("+emailVerificationToken");

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired verification token");
  }

  user.isVerified = true;

  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  res.status(200).json({
    message: "Email verified successfully",
  });
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("Email is already verified");
  }

  // Generate new verification token
  const {
    unHashedToken,
    hashedToken,
    tokenExpiry,
  } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpires = tokenExpiry;

  await user.save();

  const verificationUrl =
    `${process.env.CLIENT_URL}/verify-email/${unHashedToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your Movie App email",
    mailgenContent: emailVerificationMailgenContent(
      user.username,
      verificationUrl
    ),
  });

  res.status(200).json({
    message: "Verification email sent successfully",
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");

  if (!existingUser) {
    res.status(401);
    throw new Error("User not found");
  }

  
  if (!existingUser.isVerified) {
    res.status(403);
    throw new Error("Please verify your email before logging in");
  }


  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    res.status(401);
    throw new Error("Invalid password");
  }

  
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser, req);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    accessToken,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh token not found");
  }

  // hash the incoming refresh token
  const tokenHash = createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // find valid refresh token
  const storedToken = await RefreshToken.findOne({
    tokenHash,
    revokedAt: null,
    expiresAt: {
      $gt: new Date(),
    },
  });

  if (!storedToken) {
    res.status(401);
    throw new Error("Invalid or expired refresh token");
  }

  // find the user
  const user = await User.findById(storedToken.userId);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // revoke old refresh token
  storedToken.revokedAt = new Date();
  await storedToken.save();

  // generate new tokens
  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  // hash new refresh token
  const newTokenHash = createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  // new refresh token expiry
  const newExpiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  );

  // store new refresh token
  await RefreshToken.create({
    userId: user._id,
    tokenHash: newTokenHash,
    expiresAt: newExpiresAt,
    userAgent: req.get("user-agent"),
    ip: req.ip,
  });

  // replace old cookie with new refresh token
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // return new access token
  res.status(200).json({
    accessToken: newAccessToken,
  });
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    const tokenHash = createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await RefreshToken.findOneAndUpdate(
      {
        tokenHash,
        revokedAt: null,
      },
      {
        revokedAt: new Date(),
      }
    );
  }

  // delete refresh token cookie
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});

const getAllusers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

const getCurrentUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)
  
  if(user){
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email
    })
  }else {
    res.status(404);
    throw new Error("User not found")

  }
  
})

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const { unHashedToken, hashedToken, tokenExpiry, } = user.generateTemporaryToken();

  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${unHashedToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset your Movie App password",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      resetUrl
    ),
  });

  res.status(200).json({
    message: "Password reset email sent successfully",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token) {
    res.status(400);
    throw new Error("Reset token is required");
  }

  if (!newPassword) {
    res.status(400);
    throw new Error("New password is required");
  }

  // hash the token received from the email
  const hashedToken = createHash("sha256")
    .update(token)
    .digest("hex");

  // find user with the reset token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: new Date(),
    },
  }).select("+passwordResetToken +passwordResetExpires");

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired password reset token");
  }

  user.password = newPassword;

  // remove reset token after successful reset
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(200).json({
    message: "Password reset successfully",
  });
});
export {
  createUser , 
  verifyEmail,
  resendVerificationEmail,
  loginUser , 
  refreshAccessToken,
  logoutCurrentUser , 
  getAllusers , 
  getCurrentUserProfile , 
  updateCurrentUserProfile,
  forgotPassword,
  resetPassword
};