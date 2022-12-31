-- CreateTable
CREATE TABLE "users_table" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "is_super_user" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_table_email_key" ON "users_table"("email");
