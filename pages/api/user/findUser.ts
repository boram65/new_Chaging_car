// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../../server/client";

interface Data {
  OK: boolean;
  newChaging?: object;
  stat?: String;
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
    let mgstat: String = "";
    // userStatNm    String
    // userStatId    String
    // userChgerId   String
    // userChgerType String
    // userAddr      String
    // userStat      String

    const userdata = JSON.parse(req.body);
    const { email, statNm, statId, chgerId, chgerType, addr, stat } = userdata;
    console.log(userdata);

    //유져 정보찾기
    const user = await client.user.findUnique({
      where: {
        userEmail: email,
      },
    });
    //유져가 없으면 만들고 즐찾데이터 넣기
    if (user === null) {
      const newuser = await client.user.create({
        data: {
          userEmail: email,
        },
      });
      const userChger = await client.userChger.create({
        data: {
          userStatNm: statNm,
          userId: newuser.id,
          userStatId: statId,
          userChgerId: chgerId,
          userChgerType: chgerType,
          userAddr: addr,
          userStat: stat,
        },
      });
      mgstat = "새로운 즐겨찾기 등록!";
      console.log(mgstat);
    }
    //유져가 있으면
    else {
      //즐겨찾기 정보에 같은 정보가 있는지
      const userChagData = await client.userChger.findFirst({
        where: {
          userId: user.id,
          userStatId: statId,
          userChgerId: chgerId,
        },
      });
      //유져는 있지만 즐찻이 없으면
      if (userChagData === null) {
        const userChger = await client.userChger.create({
          data: {
            userStatNm: statNm,
            userId: user.id,
            userStatId: statId,
            userChgerId: chgerId,
            userChgerType: chgerType,
            userAddr: addr,
            userStat: stat,
          },
        });
        mgstat = "새로운 즐겨찾기 등록!";
        console.log(mgstat);
      } else {
        const deleteUserChger = await client.userChger.deleteMany({
          where: {
            userId: user.id,
            userStatId: statId,
            userChgerId: chgerId,
          },
        });
        mgstat = "즐겨찾기 삭제!";
        console.log(mgstat);
      }
    }

    res.status(200).json({ OK: true, stat: mgstat });
  } catch (err) {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
