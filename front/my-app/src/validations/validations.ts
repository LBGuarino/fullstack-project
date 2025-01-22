import { z } from "zod";

const passwordComplexSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9\s]/,
    "Password must contain at least one special character (e.g. !@#$%^&*)"
  );

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name cannot exceed 50 characters")
      .nonempty("Full name is required"),

    birthdate: z.coerce
      .date({
        invalid_type_error: "Invalid date format",
        required_error: "Birthdate is required",
      })
      .max(new Date(), "Birthdate cannot be in the future"),

    address: z
      .string()
      .trim()
      .min(5, "Address must be at least 5 characters")
      .nonempty("Address is required"),

    phone: z
      .string()
      .nonempty("Phone is required")
      .regex(
        /^[0-9+\-\s()]*$/,
        "Phone can only contain numbers, spaces, '()', '-' or '+'"
      ),

    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),

    password: passwordComplexSchema,
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z
    .object({
        email: z.string().email('Invalid email').nonempty('Email is required'),
        password: z
        .string().min(8, 'Password must be at least 8 characters long').nonempty('Password is required'),
    })
      
export type SignupFormInputs = z.infer<typeof signupSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;
