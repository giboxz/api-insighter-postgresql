import jwt from "jsonwebtoken";

export function loginAuth(req, res, next){
  const bearerToken = req.headers.authorization;

  if(!bearerToken){
    return res.status(501).send('Token de autenticação não existe.')
  }

  const [, token] = bearerToken.split(' ');

  try {
    const user = jwt.verify(token, process.env.MY_SECRET, { expiresIn: process.env.EXPIRES_IN });
    req.user = user;
    next();
  } catch (err) {
    return res.status(501).send('Token de autenticação incorreto e/ou expirado.')
  }
};