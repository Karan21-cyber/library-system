import prisma from "../prisma";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

// create new book
const createNewBook = asyncHandler(async (req: Request, res: Response) => {
  const resBody = req.body;
  const { isbn, title, author } = req.body;

  const bookExist = await prisma.books.findMany({
    where: {
      ISBN: isbn,
      title: title,
      author: author,
    },
  });

  if (bookExist) {
    return res.status(400).json({
      success: false,
      message: "Book already exist.",
    });
  }

  const newBook = await prisma.books.create({
    data: {
      ...resBody,
      ISBN: isbn,
      title: title,
      author: author,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Book Created Successfully.",
    data: newBook,
  });
});

// get all books
const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await prisma.books.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return res.status(200).json({
    success: true,
    message: "Data Fetched Successfully.",
    data: books,
  });
});

// get single book by id
const getSingleBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const singleBook = await prisma.books.findUnique({
    where: { id: id },
  });

  return res.status(200).json({
    success: true,
    message: "Single Data Fetched Successfully.",
    data: singleBook,
  });
});

// get book by search
const getBookBySearch = asyncHandler(async (req: Request, res: Response) => {
  const { q } = req.query;
  const search = q as string;

  const books = await prisma.books.findMany({
    where: {
      OR: [
        {
          ISBN: {
            contains: search,
          },
        },
        {
          title: {
            contains: search,
          },
        },
        {
          author: {
            has: search,
          },
        },
      ],
    },
    orderBy: {
      title: "asc",
    },
  });

  return res.status(200).json({
    success: true,
    message: "Search Data Fetched Successfully.",
    count: books.length,
    data: books,
  });
});

// update book by id
const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const resBody = req.body;

  await prisma.books.update({
    where: { id: id },
    data: { quantity: resBody.quantity },
  });
});

// delete book by id
const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.books.delete({
    where: { id: id },
  });

  return res.status(200).json({
    success: true,
    message: "Book Deleted Successfully.",
  });
});

const bookController = {
  createNewBook,
  getAllBooks,
  getSingleBook,
  getBookBySearch,
  updateBook,
  deleteBook,
};

export default bookController;
