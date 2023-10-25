-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED', 'CANCELED');

-- CreateEnum
CREATE TYPE "InvitationKind" AS ENUM ('FRIEND', 'CHAT', 'GAME');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('WAITING_FOR_PLAYER', 'IN_PROGRESS', 'PAUSED', 'FINISHED', 'CANCELED');

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "user42Id" INTEGER,
    "nickname" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "avatarUrl" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Invitations" (
    "invitationId" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "kind" "InvitationKind" NOT NULL,
    "chatId" INTEGER,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("invitationId")
);

-- CreateTable
CREATE TABLE "Relationships" (
    "relationshipId" SERIAL NOT NULL,
    "invitationId" INTEGER NOT NULL,

    CONSTRAINT "Relationships_pkey" PRIMARY KEY ("relationshipId")
);

-- CreateTable
CREATE TABLE "Chats" (
    "chatId" SERIAL NOT NULL,
    "name" TEXT,
    "chatAvatarUrl" TEXT,
    "password" TEXT,
    "invitationId" INTEGER[],

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("chatId")
);

-- CreateTable
CREATE TABLE "Messages" (
    "messageId" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatParticipationId" INTEGER NOT NULL,
    "messageContent" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "ChatParticipations" (
    "chatParticipationId" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "mutedUntil" TIMESTAMP(3),
    "blockedUntil" TIMESTAMP(3),
    "chatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ChatParticipations_pkey" PRIMARY KEY ("chatParticipationId")
);

-- CreateTable
CREATE TABLE "GameParticipations" (
    "GameParticipationId" SERIAL NOT NULL,
    "Point" INTEGER NOT NULL DEFAULT 0,
    "isWinner" BOOLEAN,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GameParticipations_pkey" PRIMARY KEY ("GameParticipationId")
);

-- CreateTable
CREATE TABLE "Games" (
    "gameId" SERIAL NOT NULL,
    "scoreToWin" INTEGER NOT NULL DEFAULT 3,
    "gameStatus" "GameStatus" NOT NULL DEFAULT 'WAITING_FOR_PLAYER',
    "playerOnePaddlePos" INTEGER NOT NULL DEFAULT 0,
    "playerTwoPaddlePos" INTEGER NOT NULL DEFAULT 0,
    "ballPositionX" INTEGER NOT NULL DEFAULT 0,
    "ballPositionY" INTEGER NOT NULL DEFAULT 0,
    "invitationId" INTEGER NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_user42Id_key" ON "Users"("user42Id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickname_key" ON "Users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Relationships_invitationId_key" ON "Relationships"("invitationId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatParticipations_chatId_userId_key" ON "ChatParticipations"("chatId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Games_invitationId_key" ON "Games"("invitationId");

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("chatId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationships" ADD CONSTRAINT "Relationships_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitations"("invitationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_chatParticipationId_fkey" FOREIGN KEY ("chatParticipationId") REFERENCES "ChatParticipations"("chatParticipationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipations" ADD CONSTRAINT "ChatParticipations_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("chatId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipations" ADD CONSTRAINT "ChatParticipations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipations" ADD CONSTRAINT "GameParticipations_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("gameId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipations" ADD CONSTRAINT "GameParticipations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitations"("invitationId") ON DELETE RESTRICT ON UPDATE CASCADE;
