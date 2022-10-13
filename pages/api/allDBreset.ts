import { allChaging } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import test from "node:test";
import client from "../../server/client";

type Data = {
  OK: boolean;
  err?: string;

  newAllChag?: allChaging;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const alldelete = await client.allChaging.deleteMany({});
    const tempTime = new Date();
    const nowYear = tempTime.getFullYear();
    const nowMonth = Number(tempTime.getMonth()) + 1;
    const nowDay = tempTime.getDate();
    const nowHour = tempTime.getHours();
    const nowMinute = tempTime.getMinutes();
    const nowTime =
      nowYear + "_" + nowMonth + "_" + nowDay + "_" + nowHour + "_" + nowMinute; // 현제시간

    for (let i = 0; i < 15; i++) {
      let vel: any = [];
      fetch(
        `http://apis.data.go.kr/B552584/EvCharger/getChargerInfo?serviceKey=tnt2N3pE6lzjahc3QFErVlSdGt1jxbN1Fiy10XTi4HmcPuQrmNqEwhguELsSIrrqOQOZkGtsLhEnhsPybBvoQA%3D%3D&numOfRows=9999&pageNo=${i}&dataType=JSON`
      )
        .then(res => res.json())
        .then(json => {
          {
            json.items.item.map((ele: any) => {
              const temp = ele;
              const {
                statNm,
                statId,
                chgerId,
                chgerType,
                addr,
                lat,
                lng,
                stat,
                lastTsdt,
                lastTedt,
                zcode,
                zscode,
                kind,
                kindDetail,
                parkingFree,
                limitYn,
                limitDetail,
              } = temp;
              const newAllChag = {
                statNm,
                statId,
                chgerId,
                chgerType,
                addr,
                lat: Number(lat),
                lng: Number(lng),
                stat,
                lastTsdt,
                lastTedt,
                zcode,
                zscode,
                kind,
                kindDetail,
                parkingFree,
                limitYn,
                limitDetail,
                crTime: nowTime,
              };
              vel.push(newAllChag);
            });
            console.log(vel);
          }
        })
        .then(async () => {
          const newAllArr = await client.allChaging.createMany({
            data: vel,
          });
        });
    }

    res.status(200).json({ OK: true });
  } catch {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
