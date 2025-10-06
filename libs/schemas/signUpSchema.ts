import { z } from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Username is Required" })
    .max(30, { message: "Username cannot exceed 30 characters." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.",
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),

  password: z.string().min(1, "Password is required"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
