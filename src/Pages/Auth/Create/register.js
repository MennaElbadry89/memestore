import * as  z  from "zod";
import CountrySelect from "./CountrySelect";

export const registerSchema = z.object({
  fullName: z.string()
  .min(3, "Name must be at least 3 characters"),
  
  phone: z.string()
  .min(11, "Phone must be at least 11 numbers")
  .startsWith("01", "Phone must start with 01"),

  email: z.string()
  .email("Email is invalid"),

  password: z.string()
  .min(6, "Password must be at least 6 characters"),
  
  confirmPassword: z.string(),
  
  role: z.enum(["user", "admin"], {
    required_error: "Role is required",
  }),
  
  avatar: z.string().optional(),
  
  CountrySelect: z.object({
    name: z.string(),
    flag: z.string(),
  }).optional(),
  
})
 .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
    });
