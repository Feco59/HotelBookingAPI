import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path:'../.env'})


const veryfiToken = (req,res,next) => {
  const token = req.headers["x-access-token"];

  if(!token) {
    return res.status(403).send({message:'No token!'})
  }

  jwt.verify(
    token,
    process.env.secretKey,
    (err,decoded) => {
      if (err) {
        return res.status(401).send({message: 'Unathorized!'})
      }
      req.userId = decoded.id;
      next()
    })
}

export default veryfiToken