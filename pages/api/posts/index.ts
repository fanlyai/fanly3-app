import { NextApiRequest, NextApiResponse } from "next";
var crypto = require("crypto");

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body, image, typeID } = req.body;
      var id = crypto.randomBytes(20).toString('hex');
      
     
      
      const media = await prisma.media.create({
        data: {
          type: "img",
          path: image,
          uniqueId: id
        },
      });
      
      const post = await prisma.post.create({
        data: {
          body,
          image: "",
          typeId: typeID,
          userId: currentUser.id,
          mediaId: id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;
      let authUser = null;
      try {
        const { currentUser } = await serverAuth(req, res);
        authUser = currentUser;
      } catch (error) {}


      let posts;
      if (!authUser) {
        posts = await prisma.post.findMany({
          where: {
            typeId: "4",
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else if (
        userId &&
        typeof userId === "string" &&
        authUser &&
        authUser.id == userId
      ) {
        posts = await prisma.post.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            AND: [
              {
                userId: userId,
              },
              {
                OR: [
                  {
                    typeId: "0",
                  },
                  {
                    AND: [
                      {
                        typeId: "1",
                      },
                      {
                        userId: {
                          in: authUser.followingIds,
                        },
                      },
                    ],
                  },
                  {
                    AND: [
                      {
                        typeId: "2",
                      },
                      {
                        userId: {
                          in: authUser.subscriberIds,
                        },
                      },
                    ],
                  },
                  {
                    typeId: "3",
                  },
                  {
                    AND: [
                      {
                        typeId: "4",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          where: {
            OR: [
              {
                userId: authUser.id,
              },
              {
                typeId: "0",
              },
              {
                AND: [
                  {
                    typeId: "1",
                  },
                  {
                    userId: {
                      in: authUser.followingIds,
                    },
                  },
                ],
              },
              {
                AND: [
                  {
                    typeId: "2",
                  },
                  {
                    userId: {
                      in: authUser.subscriberIds,
                    },
                  },
                ],
              },
              {
                typeId: "3",
              },
              {
                AND: [
                  {
                    typeId: "4",
                  },
                ],
              },
            ],
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
