/*
  Warnings:

  - Added the required column `company_name` to the `UserInformationEntrepreneur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInformationEntrepreneur" ADD COLUMN     "company_name" TEXT NOT NULL;
