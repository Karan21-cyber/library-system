import express from "express";
import prisma from "./prisma";
import authrouter from "./routes/auth.router";
import memberRouter from "./routes/member.router";
import errorMiddleware from "./middleware/error.middleware";
import bookRouter from "./routes/book.router";
import transactionRouter from "./routes/transaction.router";
import reportRouter from "./routes/report.router";
import bookData from "./utils/insertDatainBooks";

const app = express();
app.use(express.json());

//using the router in server

app.use(authrouter, memberRouter, bookRouter, transactionRouter, reportRouter);

// add the list of books in one click
app.post("/v1/library/insertBooks", async (req, res) => {
  const resresult = await bookData.map(async (book) => {
    await prisma.books.create({
      data: {
        title: book.title,
        ISBN: book.isbn,
        author: book.author,
        genre: book.genre,
        publishedOn: book.publishedOn,
        quantity: book.quantity,
        selfNo: book.selfNo,
        pages: book.pages,
      },
    });
  });

  if (resresult) {
    return res.status(200).json({
      success: true,
      message: "Data Inserted Successfully",
      data: { data: await prisma.books.findMany() },
    });
  }

  return res.status(200).json({
    success: false,
    message: "Data Not Inserted",
    data: prisma.books.findMany(),
  });
});

app.get("/", async (req, res) => {
  return res.send("API is running...");
});

// delete all teh books related to the ISBN in one click
app.delete("/v1/library/deleteBooks", async (req, res) => {
  const result = await bookData?.map(async (book) => {
    await prisma.books.deleteMany({
      where: {
        ISBN: book.isbn,
      },
    });
  });
  if (result) {
    return res.status(200).json({
      success: true,
      message: "Data Deleted Successfully",
      data: result,
    });
  }
  return res.status(200).json({
    success: false,
    message: "Data Not Deleted",
    data: result,
  });
});

app.use(errorMiddleware);

prisma
  .$connect()
  .then(() => {
    app.listen(4213, () => {
      console.log("Server started on port 4213.");
    });
  })
  .catch((err: unknown) => {
    console.log("Error connecting to database: ", err);
  });
