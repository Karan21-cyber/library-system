import express from "express";
import prisma from "./prisma";
import authrouter from "./routes/auth.router";
import memberRouter from "./routes/member.router";
import errorMiddleware from "./middleware/error.middleware";
import bookRouter from "./routes/book.router";

const app = express();
app.use(express.json());

//using the router in server

app.use(authrouter, memberRouter, bookRouter);

app.use(errorMiddleware);

prisma
  .$connect()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port 5000.");
    });
  })
  .catch((err: any) => {
    console.log("Error connecting to database: ", err);
  });
