import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import db from "../Model/index.js"
import { error, BookingError } from "./statusService.js"

const User = db.user

const UserService = {
  createUser: async userData => {
    try {
      await User.create({
        username: userData.username,
        password: bcrypt.hashSync(userData.password, 8),
      })
    } catch (e) {
      console.log(e)
    }
  },
  Login: async userData => {

    const user = await User.findOne({
      where: {
        username: userData.username
      }
    })

    if (!user) {
      throw (error.NOT_FOUND, 'User')
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