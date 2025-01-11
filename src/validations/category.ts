import { Translations } from "@/types/translations";
import * as z from "zod";

export const addCategorySchema = (translations: Translations) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};

export const updateCategorySchema = (translations: Translations) => {
  return z.object({
    categoryName: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};
