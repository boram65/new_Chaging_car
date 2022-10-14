// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { userChger } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../../server/client";

interface Data {
  OK: boolean;
  newChaging?: object;
  userChagData?: userChger[];
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
    let stat: String = "";

    const userdata = JSON.parse(req.body);

    const email = userdata;
    //유져 정보찾기
    const user = await client.user.findUnique({
      where: {
        userEmail: email,
      },
    });

    //유져가 없으면  유져 만듬
    if (user === null) {
      const newuser = await client.user.create({
        data: {
          userEmail: email,
        },
      });
    }
    //유져가 있으면

    //찾은 유져 데이터 불러오기
    const userChagData = await client.userChger.findMany({
      where: {
        userId: user?.id,
      },
    });
    if (userChagData == null) stat = "즐찾정보 없음 !";
    else stat = "정보 있음!";

    res.status(200).json({ OK: true, userChagData });
  } catch (err) {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
