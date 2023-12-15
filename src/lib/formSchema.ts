import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const formSchema = z.object({
  firstName: z.string().min(1,"First name is required"),
  lastName: z.string().min(1,"Last name is required"),
  birthDate: z.date({
    required_error: "Birth date is required",
    invalid_type_error: "Invalid date",
  }),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(phoneRegex, "Please enter a valid phone number"),
});