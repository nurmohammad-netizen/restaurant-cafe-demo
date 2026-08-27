import { z } from "zod";

export const orderFormSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(100),
  customer_phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+?880|0)1[3-9]\d{8}$/,
      "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন 01712345678)",
    ),
  customer_address: z
    .string()
    .trim()
    .min(10, "ডেলিভারির জন্য সম্পূর্ণ ঠিকানা দিন")
    .max(500),
  notes: z.string().trim().max(300).optional().or(z.literal("")),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

export const menuItemFormSchema = z.object({
  name: z.string().trim().min(1, "নাম আবশ্যক").max(100),
  description: z.string().trim().max(500).optional().or(z.literal("")),
  price: z.coerce.number().positive("মূল্য অবশ্যই ধনাত্মক হতে হবে"),
  category_id: z.string().uuid().nullable(),
  is_available: z.boolean(),
});

export type MenuItemFormValues = z.infer<typeof menuItemFormSchema>;
