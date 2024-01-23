import prisma from "../prisma";
import HttpException from "../utils/HttpException";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";

// create new book
const createNewBook = asyncHandler(async (req: Request, res: Response) => {
  const resBody = req.body;
  const { title, author, genre, publishedOn, quantity, selfNo, pages } =
    resBody;

  const bookExist = await prisma.books.findFirst({
    where: {
      ISBN: resBody.isbn,
    },
  });

  if (bookExist) throw new HttpException("Book Already Exist.", 400);

  const newBook = await prisma.books.create({
    data: {
      title,
      ISBN: resBody.isbn,
      author,
      genre,
      publishedOn,
      quantity,
      selfNo,
      pages,
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
            contains: search,
          },
        },
        {
          genre: {
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
  const { title, author, genre, publishedOn, quantity, selfNo, pages } =
    resBody;

  await prisma.books.update({
    where: { id: id },
    data: {
      title,
      ISBN: resBody.isbn,
      author,
      genre,
      publishedOn,
      quantity,
      selfNo,
      pages,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Book Updated Successfully.",
    data: await prisma.books.findUnique({
      where: { id: id },
    }),
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
