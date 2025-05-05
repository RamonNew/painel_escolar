import jwt from "jsonwebtoken";
import moment from "moment";

import config from "../config/config.js";

//const generateToken = (userId, expires, type) => {
export const generateToken = (userId, expires) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    //type,
  };

  return jwt.sign(payload, config.jwt.secret);
};

export const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.usuario_id,
    accessTokenExpires,
    //tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.usuario_id,
    refreshTokenExpires,
    //tokenTypes.REFRESH
  );

  // Salva o refresh token para garantir que ele possa ser invalidado se necessário
//   await saveToken(
//     refreshToken,
//     user.id,
//     refreshTokenExpires,
//     //tokenTypes.REFRESH
//   );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toISOString(), 
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toISOString(), 
    },
  };
};
