import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { credit } = req.body;
    const addCredit = await prisma?.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            credit : (credit) ,
        }
    })
    return res.status(200).json(addCredit)

    

  } catch (error) {
    console.log(error);
  }
  
}
