import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { userId } = req.query;
    if (!currentUser || typeof currentUser.id !== "string") {
      throw new Error("Invalid ID");
    }
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!existingUser || typeof existingUser.id !== "string") {
      throw new Error("Invalid ID");
    }
    
    const followers = await prisma.user.findMany({
        where: {
            followingIds: {
              has: userId,
            },
          },
    });
    return res.status(200).json(followers ? followers : "");
  } catch (error) {
    console.log(error);
  }
}
