/*
  Warnings:

  - You are about to drop the `_PositionBranches` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `branchId` to the `positions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PositionBranches" DROP CONSTRAINT "_PositionBranches_A_fkey";

-- DropForeignKey
ALTER TABLE "_PositionBranches" DROP CONSTRAINT "_PositionBranches_B_fkey";

-- DropIndex
DROP INDEX "positions_pos_name_key";

-- AlterTable
ALTER TABLE "positions" ADD COLUMN     "branchId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_PositionBranches";

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
