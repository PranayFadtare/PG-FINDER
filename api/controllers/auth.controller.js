import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt  from 'jsonwebtoken';
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  // Validate the request

  try{
  const hashedPassword = await bcrypt.hashSync(password, 10); 
  console.log(hashedPassword);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  console.log(newUser);
  res.status(201).json({message: "User created successfully"});
    }

    catch (err) {
      console.log(err);
      res.status(500).json({message: "Fail to create user"});
    }
} 


export const login = async (req, res) => {
    const { username, password } = req.body; 
    try {  
        const user = await prisma.user.findUnique({  
            where: { username }  
        });  
        if (!user) return res.status(401).json({ message: "Invalid credentials!" });  
    
       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials!" });
       
        const age = 1000 * 60 * 60 * 24 * 7;
        //res.setHeader("Set-Cookie", "test=" + "myValue").json({ message: "Logged in successfully!" });
        const token = jwt.sign({
            id: user.id,
            isAdmin: true,
        }, process.env.JWT_SECRET_KEY,{ expiresIn: age});

        const  { password: userPassword, ...userInfo } = user;
        res.cookie("token", token, { httpOnly: true, maxAge: age}).status(200).json(user);
    } catch (err) {  
        console.log(err);  
        res.status(500).json({ message: "Failed to login!" });  
    }  
}   

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logged out successfully!" });
}
