import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.status(401).json({sucess:false,msg:"Access denied"});
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({sucess:false,msg:"invalid token "});
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({sucess:false,msg:"invalid token "});

    }

}