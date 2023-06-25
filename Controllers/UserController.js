import UserService from "../Services/UserService.js"

export const UserController = {
  UserLogin : async (req,res,next) => {
    try {
      
      const LoginResult = await UserService.Login(req.body);
   
      res.status(200).send(LoginResult)
    } catch(e) {
      res.status(e.statusCode).send(e.message)
    }
    
  }
}