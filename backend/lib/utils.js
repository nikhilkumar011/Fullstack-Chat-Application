const jwt = require('jsonwebtoken');

exports.generateToken = async (userId, res) => {
   const token = jwt.sign({ userId }, process.env.SECRET, { expiresIn: "7d" })

   res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",   
      secure: false      
   });

   return token;
}