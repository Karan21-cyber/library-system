import prisma from "../prisma";
import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";

const getReport = asyncHandler(async (req: Request, res: Response) => {
  const report = await prisma.report.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      memberborrows: true,
      bookId: true,
      book: {
        select: {
          id: true,
          title: true,
          ISBN: true,
        },
      },
    },
  });
  return res.status(200).json({
    success: true,
    message: "Data Fetched Successfully.",
    data: report,
  });
});

const getSingleReport = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleReport = await prisma.report.findUnique({
    where: { id: id },
    select: {
      id: true,
      memberborrows: true,
      bookId: true,
      book: {
        select: {
          id: true,
          title: true,
          ISBN: true,
        },
      },
    },
  });
  return res.status(200).json({
    success: true,
    message: "Single Data Fetched Successfully.",
    data: singleReport,
  });
});

const getReportByBookId = asyncHandler(async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const report = await prisma.report.findMany({
    where: {
      bookId: bookId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      memberborrows: true,
      bookId: true,
      book: {
        select: {
          id: true,
          title: true,
          ISBN: true,
        },
      },
    },
  });
  return res.status(200).json({
    success: true,
    message: "Data Fetched Successfully.",
    data: report,
  });
});

const updateReport = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const resBody = req.body;

  await prisma.report.update({
    where: { id: id },
    data: resBody,
  });
  return res.status(200).json({
    success: true,
    message: "Report Updated Successfully.",
    data: await prisma.report.findUnique({
      where: { id: id },
    }),
  });
});

const deleteReport = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.report.delete({
    where: { id: id },
  });

  return res.status(200).json({
    success: true,
    message: "Report Deleted Successfully.",
  });
});

const reportController = {
  getReport,
  getSingleReport,
  getReportByBookId,
  updateReport,
  deleteReport,
};
export default reportController;
