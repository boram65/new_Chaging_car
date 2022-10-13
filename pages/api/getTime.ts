import { allChaging } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import test from "node:test";
import client from "../../server/client";

type Date = {
  OK: boolean;
  err?: string;
  DBtime?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Date>
) {
  try {
    const standard = await client.allChaging.findFirst({
      where: {
        statNm: "선문대학교",
      },
    });

    const DBtime = standard?.crTime;

    res.status(200).json({ OK: true, DBtime });
  } catch {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
