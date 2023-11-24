import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { userId, credit } = req.body;

    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID');
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if(credit <= 0 && user?.subscriberPrice && user?.subscriberPrice > 0.0){
      throw new Error('Not Credit');
    }
    

    if (!user) {
      throw new Error('Invalid ID');
    }

    let updatedSubscribingIds = [...(currentUser.subscriberIds || [])];

    if (req.method === 'POST') {
      updatedSubscribingIds.push(userId);

      // NOTIFICATION PART START
      try {
        await prisma.notification.create({
          data: {
            body: (currentUser.username + ' subscribed you!'),
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          }
        });

        console.log("********----- " +credit)

        if(credit > 0){
          await prisma.user.update({
            where: {
              id: currentUser.id,
            },
            data: {
              credit: credit,
            }
          });
  
        }
      } catch (error) {
        console.log(error);
      }
      // NOTIFICATION PART END
      
    }

    if (req.method === 'DELETE') {
      updatedSubscribingIds = updatedSubscribingIds.filter((subscribingId) => subscribingId !== userId);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        subscriberIds: updatedSubscribingIds
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}