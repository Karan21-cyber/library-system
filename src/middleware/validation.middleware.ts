import { NextFunction, Request, Response } from "express";
import { type AnyZodObject } from "zod";

const validationMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.issues[0].message,
        issues: err.issues,
      });
    }
  };
};

export default validationMiddleware;
