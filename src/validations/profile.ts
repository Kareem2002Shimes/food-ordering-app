import { Translations } from "@/types/translations";
import { z } from "zod";

export const updateProfileSchema = (translations: Translations) => {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: translations.validation.nameRequired }),
    email: z.string().trim().email({
      message: translations.validation.validEmail,
    }),
    phone: z
      .string()
      .trim()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        {
          message: translations.profile.form.phone.validation?.invalid,
        }
      ),
    streetAddress: z.string().optional(),
    postalCode: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value) return true;
          return /^\d{5,10}$/.test(value);
        },
        {
          message: translations.profile.form.postalCode.validation?.invalid,
        }
      ),
    city: z.string().optional(),
    country: z.string().optional(),
    image: z.custom((val) => val instanceof File).optional(),
  });
};
