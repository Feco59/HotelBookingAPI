import UserService from "../Services/UserService.js"

export const UserController = {
  UserRegistration: async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await UserService.createUser(username, password);
      res.status(200).send(user);
    } catch (e) {
      console.log(e)
      if (!e.statusCode) {
        res.status(500).send('Server Error')
      } else {
        res.status(e.statusCode).send(e.message)
      }
    }
  },
  UserLogin: async (req, res) => {
    try {

      const LoginResult = await UserService.Login(req.body);

      res.status(200).send(LoginResult)
    } catch (e) {

      if (!e.statusCode) {
        res.send(500).send('Server Error')
      }
      res.status(e.statusCode).send(e.message)
    }
  }
}