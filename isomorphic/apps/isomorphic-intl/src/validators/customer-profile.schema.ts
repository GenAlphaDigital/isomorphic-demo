import { z } from "zod";
import { messages } from "@/config/messages";
import { validateEmail } from "./common-rules";

// form zod validation schema
export const customerProfileSchema = (t: (arg: string) => string) =>
  z.object({
    avatar: z.string().optional(),
    coverPhoto: z.string().optional(),
    fullName: z.string().min(5, {
      message: messages.fullNameIsRequired,
    }),
    email: validateEmail(t),
    phone: z.string(),
    password: z.string().optional(),
    company: z.string().optional(),
    region: z.string().optional(),
    country: z.string().optional(),
    city: z.string().optional(),
    street: z.string().optional(),
    status: z.string().optional(),
    customerSource: z.string().optional(),
  });

// generate form types from zod validation schema
export type CustomerProfileSchema = z.infer<ReturnType<typeof customerProfileSchema>>;
