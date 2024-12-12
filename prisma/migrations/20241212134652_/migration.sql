-- CreateEnum
CREATE TYPE "ExtraIngredients" AS ENUM ('CHEESE', 'BACON', 'TOMATO', 'ONION', 'PEPPER');

-- CreateTable
CREATE TABLE "Extra" (
    "id" TEXT NOT NULL,
    "name" "ExtraIngredients" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Extra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extra" ADD CONSTRAINT "Extra_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
