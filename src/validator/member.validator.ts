import * as z from "zod";

export const memberSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required.",
    }),
    address: z.string().optional(),
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Invalid Email." }),
    phoneNo: z
      .string({ required_error: "Phone No. is required." })
      .min(10, { message: "Minimum 10 digits required." }),
  }),
});

export const updateMemberSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    address: z.string().optional(),
    phoneNo: z.string().optional(),
  }),
});
