import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or fewer"),
  email: z.email("Please enter a valid email address").max(254),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters")
    .max(160, "Subject must be 160 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be 5,000 characters or fewer"),
  website: z.string().max(200).optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
