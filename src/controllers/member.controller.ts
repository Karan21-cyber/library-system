import prisma from "../prisma";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

// create New Member
const createMember = asyncHandler(async (req: Request, res: Response) => {
  const resBody = req.body;
  const email = resBody.email.toLowerCase();

  const userExist = await prisma.member.findUnique({
    where: { email: email },
  });

  if (userExist) throw new HttpException("User Already Exist.", 400);

  const member = await prisma.member.create({
    data: { ...resBody, email: email },
  });

  return res.status(201).json({
    success: true,
    message: "Member Created Successfully.",
    data: member,
  });
});

// get All Members
const getAllMember = asyncHandler(async (req: Request, res: Response) => {
  const members = await prisma.member.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json({
    success: true,
    message: "Data Fetched Successfully.",
    data: members,
  });
});

// get Single Member
const getSingleMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const singleMember = await prisma.member.findUnique({
    where: { id: id },
  });

  if (!singleMember) throw new HttpException("Member Not Found.", 404);
  return res.status(200).json({
    success: true,
    message: "Single Data Fetched Successfully.",
    data: singleMember,
  });
});

// update Member
const updateMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, address, phoneNo, email } = req.body;

  if (email)
    throw new HttpException("Invalid Fields Passed. Field: email", 400);

  await prisma.member.update({
    where: { id: id },
    data: { name, address, phoneNo },
  });

  return res.status(200).json({
    success: true,
    message: "Member Updated Successfully.",
    data: await prisma.member.findUnique({
      where: { id: id },
    }),
  });
});

// delete Member
const deleteMember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.member.delete({
    where: { id: id },
  });

  return res.status(200).json({
    success: true,
    message: "Member Deleted Successfully.",
  });
});

const memberController = {
  createMember,
  getAllMember,
  getSingleMember,
  updateMember,
  deleteMember,
};

export default memberController;
