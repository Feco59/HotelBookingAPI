import UserService from "../Services/UserService.js"

export const UserController = {
  UserLogin: async (req, res) => {
    try {

      const LoginResult = await UserService.Login(req.body);

      res.status(200).send(LoginResult)
    } catch (e) {

      if(!e.errCode) {
        res.send(500).send('Server Error')
      }
      res.status(e.statusCode).send(e.message)
    }

  }
}