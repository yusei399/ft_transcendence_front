-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "nickName" TEXT,
    "email" TEXT NOT NULL,
    "hash" TEXT,
    "avatarUrl" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
