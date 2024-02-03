import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNjk5NTE2NiwiaWF0IjoxNzA2OTk1MTY2fQ.UtJOqjUpMUdzb_URUdUffjn7qmqOOUzYfnCPDMTsWA0";



interface DecodedToken {
    userId: string;

}



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
   
    const token = req.header('Authorization')?.replace('Bearer ', '');

   
    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação ausente' });
    }

    try {

        const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
        
        // req.user = decodedToken.userId;
        // setUser(decodedToken.userId);
        if (req.user) {
            req.user.userId = decodedToken.userId;
          } else {
            // Se req.user não existe, crie um objeto e atribua a propriedade
            req.user = { userId: decodedToken.userId };
          }
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

