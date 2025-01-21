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

    export const orderFormSchema = z
    .object({
      name: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters.")
        .max(50, "Full name cannot exceed 50 characters.")
        .nonempty("Full name is required."),
      address: z
        .object({
          street: z.string().min(5, "Street address must be at least 5 characters.").optional(),
          city: z.string().nonempty("City is required.").optional(),
          postalCode: z
            .string()
            .regex(/^\d{4,10}$/, "Postal code must be between 4 and 10 digits.")
            .optional(),
          country: z.string().nonempty("Country is required.").optional(),
        })
        .optional(), // Address fields are optional if `pickup` is selected
      phone: z
        .string()
        .nonempty("Phone is required.")
        .regex(/^[0-9+\-\s()]*$/, "Phone can only contain numbers, spaces, '()', '-', or '+'."),
      email: z
        .string()
        .email("Invalid email format.")
        .nonempty("Email is required."),
      pickupPoint: z
        .number()
        .nullable()
        .optional(), // Optional for delivery mode
      paymentDetails: z.object({
        cardNumber: z
          .string()
          .nonempty("Card number is required.")
          .regex(/^\d{16}$/, "Card number must be 16 digits."),
        expiryDate: z
          .string()
          .nonempty("Card expiry is required.")
          .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format."),
        cvv: z
          .string()
          .nonempty("Card CVV is required.")
          .regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits."),
      }),
    })
    .refine(
      (data) =>
        data.pickupPoint !== null ||
        (data.address &&
          data.address.street &&
          data.address.city &&
          data.address.postalCode &&
          data.address.country),
      {
        message: "Either a pickup point or a complete delivery address is required.",
        path: ["address"], // Focuses on address fields for error feedback
      }
    );
  
export type SignupFormInputs = z.infer<typeof signupSchema>;
export type LoginFormInputs = z.infer<typeof loginSchema>;
export type OrderFormInputs = z.infer<typeof orderFormSchema>;

