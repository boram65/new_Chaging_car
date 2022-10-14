// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { userChger } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../../server/client";

interface Data {
  OK: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //405 메서트 확인
  if (req.method !== "POST") {
    res.status(405).json({ OK: false }); //405 에러를 니오게함
    return;
  }
  try {
    const deletData = JSON.parse(req.body);

    console.log(deletData);
    const { userId, userStatId, userChgerId } = deletData;

    console.log(userId);

    const userChagData = await client.userChger.findFirst({
      where: {
        userId: userId,
        userStatId: userStatId,
        userChgerId: userChgerId,
      },
    });

    const deleteUser = await client.userChger.delete({
      where: {
        id: userChagData?.id,
      },
    });

    res.status(200).json({ OK: true });
  } catch (err) {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
