import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function auth (req: Request, res: Response, next: NextFunction){
  const { sessionToken } = req.cookies
  if (!sessionToken) res.status(401).json('unauthorized')
  else if(sessionToken){
  const authorized = jwt.verify(sessionToken, 'secret')
  if (authorized) next()
  else res.status(500).json('error')
}
}