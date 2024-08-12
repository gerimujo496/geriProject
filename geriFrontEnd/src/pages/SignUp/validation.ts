import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(3, "Name length should be loger then 3"),
    email: z.string().min(5, "Email is required").email(),
    password: z.string().min(8, "Password should be at minimum length of 8"),

    confirmPassword: z
      .string()
      .min(8, "Password should be at minimum length of 8"),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords are not the same",
    path: ["confirmPassword"],
  });
