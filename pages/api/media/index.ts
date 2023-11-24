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
  const { currentUser } = await serverAuth(req, res);

  try {
    const { mediaId } = req.query;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post ID");
    }

    if (!mediaId || typeof mediaId !== "string") {
      throw new Error("Invalid media ID");
    }

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    console.log(post);
    if (
      post === null ||
      post.mediaId !== mediaId ||
      (post.typeId === "3" && post.userId != currentUser.id && !post.subscriberIds.includes(currentUser.id))
    ) {
      const placeholder = {
        id: "1",
        type: "img",
        path: "/images/placeholder.png",
        uniqueId: "1"
      };
      return res.status(200).json(placeholder);
    }

    const media = await prisma.media.findFirst({
      where: {
        uniqueId: mediaId,
      },
    });

    return res.status(200).json(media);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

/* OR: [
          {
            AND: [
              {
                id: postId,
              },
              {
                subscriberIds: {
                  has: currentUser.id,
                },
              },
              {
                typeId: "3",
              },
            ],
          },
          {
            id: postId
          },
        ],
         */
