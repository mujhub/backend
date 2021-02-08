import mongoose from "mongoose";
import AuthUser from "./models/AuthUser.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { USER } from "../Roles.js";
import RefreshToken from "./models/RefreshToken.js";
import { ApolloError } from "apollo-server-express";
import crypto from "crypto";
import {
  AUTHORIZATION_ERROR,
  EMAIL_ALREADY_REGISTERED_ERROR,
  EXPIRED_REFRESH_TOKEN_ERROR,
  INTERNAL_SERVER_ERROR,
} from "../ErrorCodes.js";

const { ObjectId } = mongoose.Types;

export const createNewUser = async (newUser) => {
  const _id = new ObjectId();
  const { email, password } = newUser;

  let hashedPassword = await bcrypt.hash(password, 5);

  const userEntry = new AuthUser({
    _id,
    email,
    password: hashedPassword,
    emailVerified: false,
    grants: [...USER],
    createdAt: Date.now(),
  });

  try {
    const storedUser = await userEntry.save();
    if (storedUser == userEntry) return { ack: true };
  } catch (error) {
    if (error.name === "MongoError" && error.code === 11000)
      throw new ApolloError(
        EMAIL_ALREADY_REGISTERED_ERROR.message,
        EMAIL_ALREADY_REGISTERED_ERROR.code
      );
  }

  throw new ApolloError(
    INTERNAL_SERVER_ERROR.message,
    INTERNAL_SERVER_ERROR.code
  );
};

export const loginUser = async (user) => {
  const { email, password } = user;

  const storedUser = await AuthUser.findOne({ email: email });

  if (storedUser) {
    let match = await bcrypt.compare(password, storedUser.password);

    if (match) {
      const accessObj = await createNewAccessToken(storedUser);
      const refreshObj = await createNewRefreshToken();

      await expireAllRefreshTokensForUser(storedUser);

      const { storedRefreshToken, newRefreshToken } = await storeNewRefreshToken(
        storedUser,
        refreshObj
      );

      if ((await storedRefreshToken) == newRefreshToken)
        return {
          accessToken: accessObj,
          refreshToken: refreshObj,
        };

      throw new ApolloError(
        INTERNAL_SERVER_ERROR.message,
        INTERNAL_SERVER_ERROR.code
      );
    }
  }

  throw new ApolloError(AUTHORIZATION_ERROR.message, AUTHORIZATION_ERROR.code);
};

export const refresh = async (oldRefreshToken) => {
  const sha256 = crypto.createHash("sha256");

  const currentTime = Math.round(Date.now() / 1000);
  const oldTokenHash = sha256.update(oldRefreshToken).digest("hex");
  const oldStoredToken = await RefreshToken.findOne({ token: oldTokenHash });

  if (
    oldStoredToken &&
    (!oldStoredToken.used || oldStoredToken.exp >= currentTime)
  ) {
    
    const storedUser = await AuthUser.findById(oldStoredToken.userId);
    if (storedUser) {
      const accessObj = await createNewAccessToken(storedUser);
      const refreshObj = await createNewRefreshToken();

      await expireAllRefreshTokensForUser(storedUser);

      const { storedRefreshToken, newRefreshToken } = await storeNewRefreshToken(
        storedUser,
        refreshObj
      );

      if ((await storedRefreshToken) == newRefreshToken)
        return {
          accessToken: accessObj,
          refreshToken: refreshObj,
        };

      throw new ApolloError(
        INTERNAL_SERVER_ERROR.message,
        INTERNAL_SERVER_ERROR.code
      );
    }
  }

  throw new ApolloError(
    EXPIRED_REFRESH_TOKEN_ERROR.message,
    EXPIRED_REFRESH_TOKEN_ERROR.code
  );
};

const createNewAccessToken = async (user) => {
  const iat = Math.round(Date.now() / 1000);
  const exp = iat + 15 * 60; // 15 minutes
  const payload = {
    iss: "www.mujhub.com",
    aud: "www.mujhub.com",
    "www.mujhub.com": {
      grants: [...user.grants],
    },
    iat,
    exp,
  };

  return {
    jwt: jsonwebtoken.sign(payload, "mIAb!r@5r@pA7ZK19x4Wl0Y83T5!@$De"),
    exp,
  };
};

const createNewRefreshToken = async () => {
  const iat = Math.round(Date.now() / 1000);
  const exp = iat + 30 * 24 * 60 * 60; // 1 month
  const payload = {
    iss: "www.mujhub.com",
    aud: "www.mujhub.com",
    iat,
    exp,
  };

  return {
    jwt: jsonwebtoken.sign(payload, "mIAb!r@5r@pA7ZK19x4Wl0Y83T5!@$De"),
    exp,
  };
};

const expireAllRefreshTokensForUser = async (storedUser) => {
  // expire all refresh tokens of user. will generally only be one.
  // known as Refresh Token Rotation
  await RefreshToken.updateMany(
    {
      userId: storedUser._id,
      used: false,
      exp: { $lt: Date.now() },
    },
    { used: true }
  );
};

const storeNewRefreshToken = async (storedUser, refreshObj) => {
  const sha256 = crypto.createHash("sha256");

  const _id = new ObjectId();
  const newRefreshToken = new RefreshToken({
    _id,
    userId: storedUser._id,
    token: sha256.update(refreshObj.jwt).digest("hex"),
    exp: refreshObj.exp,
    used: false,
  });

  return {
    storedRefreshToken: newRefreshToken.save(),
    newRefreshToken: newRefreshToken,
  };
};
