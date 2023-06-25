import user from "../Model/user.js";

checkDublicateUserName = async(req,res,next) => {
  try {
    const User = await user.findOne({
      where: {
        username: req.body.username
      }
    })

    if(User) {
      return res.status(400).send({msg: "UserName is already taken"})
    }
  } catch(e) {
    return res.status(500).send({msg: e.message})
  }
}

export default checkDublicateUserName