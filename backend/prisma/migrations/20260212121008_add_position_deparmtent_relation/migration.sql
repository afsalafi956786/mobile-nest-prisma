-- CreateTable
CREATE TABLE "positions" (
    "id" SERIAL NOT NULL,
    "pos_name" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PositionBranches" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PositionBranches_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "positions_pos_name_key" ON "positions"("pos_name");

-- CreateIndex
CREATE INDEX "_PositionBranches_B_index" ON "_PositionBranches"("B");

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionBranches" ADD CONSTRAINT "_PositionBranches_A_fkey" FOREIGN KEY ("A") REFERENCES "Branch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PositionBranches" ADD CONSTRAINT "_PositionBranches_B_fkey" FOREIGN KEY ("B") REFERENCES "positions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
