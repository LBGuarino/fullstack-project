import { z } from "zod";

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
          .optional(),
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
          .optional(),
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
          path: ["address"],
        }
      );

export type OrderFormInputs = z.infer<typeof orderFormSchema>;

