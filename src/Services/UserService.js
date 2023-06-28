import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import db from "../Model/index.js"
import { error, BookingError } from "./statusService.js"

const User = db.user

const UserService = {
  createUser: async (username,password) => {

      const checkUserAlreadyExists = await User.findOne({
        where: {
          username: username
        }
      });

      if(checkUserAlreadyExists) {
        throw BookingError(error.USERNAME_ALREADY_TAKEN)
      }

      const user = await User.create({
        username,
        password: bcrypt.hashSync(password, 8),
      })

      return user;
  },
  Login: async userData => {

    const user = await User.findOne({
      where: {
        username: userData.username
      }
    })

    if (!userData.username) {
      throw BookingError(error.MISSING_INPUT, 'username')
    }
    if (!userData.password) {
      throw BookingError(error.MISSING_INPUT, 'password')
    }

    if (!user) {
      throw BookingError(error.NOT_FOUND, 'User')
    }
    const passwordValidation = bcrypt.compareSync(
      userData.password,
      user.password
    );
    if (!passwordValidation) {
      throw BookingError(error.UNAUTHORIZED_REQUEST, 'Username or password is incorrect')
    }

    const token = jwt.sign({ id: user.id },
      process.env.secretKey,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400
      })

    return {
      token,
      username: user.username,
      id: user.id
    }

  }
}

export default UserService