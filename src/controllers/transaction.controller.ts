import { Request,Response } from "express";
import asyncHandler from "../utils/asyncHandler";

// create new transaction
const createNewTransaction = asyncHandler(async (req: Request, res: Response) => {
    const resBody = req.body;
    const { member_id, book_id, borrow_date, return_date } = req.body;
    
})