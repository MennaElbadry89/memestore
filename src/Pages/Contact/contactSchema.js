import * as  z  from "zod";

export const contactSchema = z.object({
  name: z.string()
  .min(3, "Name must be at least 3 characters"),
  
  phone: z.string()
  .min(11, "Phone must be at least 11 numbers")
  .startsWith("01", "Phone must start with 01")
  .optional(),

  email: z.string()
  .email("Email is invalid"),
  
  message: z.string()
  .min(5, "Message must be at least 5 characters"),
})



