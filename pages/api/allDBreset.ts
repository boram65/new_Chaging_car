import { allChaging } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import test from "node:test";
import client from "../../server/client";

type Data = {
  OK: boolean;
  err?: string;

  newAllChag?: allChaging;
};

// export interface item {
//   statNm: string;
//   statId: string;
//   chgerId: string;
//   chgerType: string;
//   addr: string;
//   lat: string;
//   lng: string;
//   stat: string;
//   lastTsdt: string;
//   lastTedt: string;
//   zcode: string;
//   zscode: string;
//   kind: string;
//   kindDetail: string;
//   parkingFree: string;
//   limitYn: string;
//   limitDetail: string;
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
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
