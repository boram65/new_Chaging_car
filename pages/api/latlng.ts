// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { allChaging, prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../server/client";

type Data = {
  ok: boolean;
  err?: String;
  obj?: object;
  alldata?: allChaging[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    //post 메서드가 아니면
    res
      .status(405)
      .json({ ok: false, err: `지원하지 않는 메서드입니다. : ${req.method}` }); //405 에러를 니오게함
    return;
  }

  try {
    const obj = JSON.parse(req.body);

    const { Lat, Lon } = obj;

    let tempLat = Lat.toString().substring(0, 5);
    let tempLng = Lon.toString().substring(0, 6);

    let upLat = Number(tempLat) + 0.01;
    let doLat = Number(tempLat) - 0.01;
    let upLng = Number(tempLng) + 0.02;
    let doLng = Number(tempLng) - 0.02;

    upLat = Number(upLat.toFixed(2));
    doLat = Number(doLat.toFixed(2));
    upLng = Number(upLng.toFixed(2));
    doLng = Number(doLng.toFixed(2));

    const alldata = await client.allChaging.findMany({
      where: {
        AND: [
          {
            lat: {
              gte: doLat,
            },
            lng: {
              gte: doLng,
            },
          },
          {
            lat: {
              lte: upLat,
            },
            lng: {
              lte: upLng,
            },
          },
        ],
      },
    });
    console.log(alldata.length);

    // console.log(alldata);
    // console.log("upLat : " + upLat);
    // console.log("doLat : " + doLat);
    // console.log("upLng : " + upLng);
    // console.log("doLng : " + doLng);

    res.status(200).json({ ok: true, alldata });
  } catch (err) {
    res.status(200).json({ ok: false, err: `${err}` });
  } finally {
    await client.$disconnect();
  }
}
