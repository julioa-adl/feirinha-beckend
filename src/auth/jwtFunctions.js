import jwt from 'jsonwebtoken';

const secret = process.env.SECRET_KEY

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const createToken = (userWithoutPassword) => {
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
  return token;
};

const verifyToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secret);
    return payload.data;
  } catch (erro) {
    return { isError: true, erro };
  }
};

export { createToken, verifyToken };
