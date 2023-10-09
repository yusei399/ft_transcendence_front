-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REFUSED');

-- CreateEnum
CREATE TYPE "InvitationKind" AS ENUM ('FRIEND', 'CHAT', 'GAME');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('WAITING_FOR_PLAYER', 'IN_PROGRESS', 'PAUSED', 'FINISHED', 'CANCELED');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "id42" INTEGER,
    "nickname" TEXT,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitations" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "invitationStatus" "InvitationStatus" NOT NULL,
    "kind" "InvitationKind" NOT NULL,
    "targetChatId" INTEGER,
    "targetGameId" INTEGER,
    "targetRelationshipId" INTEGER,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relationships" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chats" (
    "id" SERIAL NOT NULL,
    "chatAvatarUrl" TEXT,
    "hashedPassword" TEXT,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatParticipations" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "mutedUntil" TIMESTAMP(3),
    "blockedUntil" TIMESTAMP(3),
    "chatId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ChatParticipations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameParticipations" (
    "id" SERIAL NOT NULL,
    "Point" INTEGER NOT NULL DEFAULT 0,
    "isWinner" BOOLEAN,
    "gameId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GameParticipations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "scoreToWin" INTEGER NOT NULL DEFAULT 3,
    "gameStatus" "GameStatus" NOT NULL DEFAULT 'WAITING_FOR_PLAYER',
    "playerOnePaddlePos" INTEGER NOT NULL DEFAULT 0,
    "playerTwoPaddlePos" INTEGER NOT NULL DEFAULT 0,
    "ballPositionX" INTEGER NOT NULL DEFAULT 0,
    "ballPositionY" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id42_key" ON "Users"("id42");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickname_key" ON "Users"("nickname");

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_targetChatId_fkey" FOREIGN KEY ("targetChatId") REFERENCES "Chats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_targetGameId_fkey" FOREIGN KEY ("targetGameId") REFERENCES "Games"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitations" ADD CONSTRAINT "Invitations_targetRelationshipId_fkey" FOREIGN KEY ("targetRelationshipId") REFERENCES "Relationships"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "ChatParticipations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipations" ADD CONSTRAINT "ChatParticipations_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatParticipations" ADD CONSTRAINT "ChatParticipations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipations" ADD CONSTRAINT "GameParticipations_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameParticipations" ADD CONSTRAINT "GameParticipations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
