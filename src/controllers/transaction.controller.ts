import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import prisma from "../prisma";
import HttpException from "../utils/HttpException";

// create new transaction
const createNewTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const { memberId, bookId, status } = req.body;

    //fetching the book through book id
    const book = await prisma.books.findUnique({
      where: {
        id: bookId,
      },
    });

    // checking the book
    if (!book) {
      throw new HttpException("Book not found.", 400);
    }

    if (book?.quantity == 0) {
      throw new HttpException("Book is not available.", 400);
    }

    const count: number = book?.quantity - 1;

    const updateBook = await prisma.books.update({
      where: {
        id: bookId,
      },
      data: {
        quantity: count,
      },
    });

    const newTransaction = await prisma.transaction.create({
      data: {
        ...req.body,
        borrowDate: req.body.borrowDate,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Transaction Created Successfully.",
      data: newTransaction,
    });
  }
);

const updateTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const resBody = req.body;

  await prisma.transaction.update({
    where: { id: id },
    data: {
      ...resBody,
      returnDate: resBody.returnDate,
      status: resBody.status,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Transaction Updated Successfully.",
    data: await prisma.transaction.findUnique({
      where: { id: id },
    }),
  });
});

const getallTransaction = asyncHandler(async (req: Request, res: Response) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json({
    success: true,
    message: "Data Fetched Successfully.",
    data: transactions,
  });
});

const singleTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleTransaction = await prisma.transaction.findUnique({
    where: { id: id },
  });

  return res.status(200).json({
    success: true,
    message: "Single Data Fetched Successfully.",
    data: singleTransaction,
  });
});

const getTransactionByBookId = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        bookId: bookId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully.",
      data: transactions,
    });
  }
);

const getTransactionByMemberId = asyncHandler(
  async (req: Request, res: Response) => {
    const { memberId } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        memberId: memberId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully.",
      data: transactions,
    });
  }
);

const getTransactionByStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        status: status,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Data Fetched Successfully.",
      data: transactions,
    });
  }
);

const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.transaction.delete({
    where: { id: id },
  });

  return res.status(200).json({
    success: true,
    message: "Transaction Deleted Successfully.",
  });
});

const transactionController = {
  createNewTransaction,
  getTransactionByBookId,
  getTransactionByMemberId,
  getTransactionByStatus,
  getallTransaction,
  singleTransaction,
  updateTransaction,
  deleteTransaction,
};

export default transactionController;
