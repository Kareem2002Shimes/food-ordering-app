"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getTrans(locale);
  try {
    await db.user.delete({
      where: { id },
    });
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${id}/${Pages.EDIT}`
    );
    return {
      status: 200,
      message: translations.messages.deleteUserSucess,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
