import { Request, Response } from "express";
import prisma from "../prisma";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, name } = req.body;
  const user_email = email.trim().toLowerCase();
  const user_name = name.trim().toLowerCase();

  const userLogin = await prisma.member.findUnique({
    where: {
      name: user_name,
      email: user_email,
    },
  });

  if (!userLogin) throw new HttpException("User not found", 400);

  return res.status(200).json({
    success: true,
    message: "Member Found.",
    data: userLogin,
  });
});

const authController = { login };
export default authController;
