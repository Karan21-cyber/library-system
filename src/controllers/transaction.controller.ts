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

    const findreport = await prisma.report.findUnique({
      where: {
        bookId: bookId,
      },
    });

    if (findreport) {
      await prisma.report.update({
        where: {
          bookId: bookId,
        },
        data: {
          memberborrows: findreport.memberborrows + 1,
        },
      });
    } else {
      await prisma.report.create({
        data: {
          bookId: bookId,
          memberborrows: 1,
        },
      });
    }

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

  const result = await prisma.transaction.update({
    where: { id: id },
    data: {
      ...resBody,
      returnDate: resBody.returnDate,
      status: resBody.status,
    },
  });

  const book = await prisma.books.findUnique({
    where: {
      id: result.bookId,
    },
  });

  if (book) {
    if (result.status === "returned") {
      const count: number = book?.quantity + 1;
      const updateBook = await prisma.books.update({
        where: {
          id: book.id,
        },
        data: {
          quantity: count,
        },
      });
    }
  }

  return res.status(200).json({
    success: true,
    message: "Transaction Updated Successfully.",
    data: await prisma.transaction.findUnique({
      where: { id: id },
      select: {
        id: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
        returnDate: true,
        status: true,
        Member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Book: {
          select: {
            id: true,
            title: true,
            ISBN: true,
          },
        },
      },
    }),
  });
});

const getallTransaction = asyncHandler(async (req: Request, res: Response) => {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      bookId: true,
      memberId: true,
      borrowDate: true,
      returnDate: true,
      status: true,
      Member: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Book: {
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
    data: transactions,
  });
});

const singleTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleTransaction = await prisma.transaction.findUnique({
    where: { id: id },
    select: {
      id: true,
      bookId: true,
      memberId: true,
      borrowDate: true,
      returnDate: true,
      status: true,
      Member: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Book: {
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
    data: singleTransaction,
  });
});

const getTransactionByBookId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        bookId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
        returnDate: true,
        status: true,
        Member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Book: {
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
      data: transactions,
    });
  }
);

const getTransactionByMemberId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: {
        memberId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
        returnDate: true,
        status: true,
        Member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Book: {
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
      select: {
        id: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
        returnDate: true,
        status: true,
        Member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        Book: {
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
