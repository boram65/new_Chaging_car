import { allChaging } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import test from "node:test";
import client from "../../server/client";

type Data = {
  OK: boolean;
  err?: string;
  location?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    let location: any = {};
    fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GPS_URL}`,
      { method: "POST" }
    )
      .then(res => res.json())
      .then(json => {
        location = json.location;

        res.status(200).json({ OK: true, location });
      });
  } catch {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
