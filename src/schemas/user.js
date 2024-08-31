import { z } from "zod";

const fullnameSchema = z
  .string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  })
  .min(1, "Name is required")
  .min(3, "Name must be atleast 3 characters long")
  .max(30, "Name can't be longer than 30 characters");

const emailSchema = z
  .string({
    required_error: "Email is required",
    invalid_type_error: "Email must be a string",
  })
  .min(1, "Email is required")
  .min(5, "Email must be atleast 5 characters long")
  .max(50, "Email can't be longer than 50 characters")
  .email("Email isn't valid");

const passwordSchema = z
  .string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  })
  .min(1, "Password is required")
  .min(8, "Password must be atleast 8 characters long")
  .max(50, "Password can't be longer than 50 characters");

const userSchema = z.object({
  fullname: fullnameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export function validateUser(user) {
  return userSchema.safeParse(user);
}
