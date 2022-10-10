// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { json } from "stream/consumers";
import client from "../../server/client";

interface Data {
  OK: boolean;
  newChaging?: object;
}
interface hehe {
  zscode?: String;
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
    const { code } = req.query;

    // const deleteDevice = await client.allChaging.delete({
    //   where: {
    //     id: deviceid?.toString(),
    //   },
    // });
    const newChaging = await client.allChaging.findMany({
      where: {
        zscode: code?.toString(),
      },
    });

    console.log(newChaging);

    res.status(200).json({ OK: true, newChaging });
  } catch (err) {
    res.status(200).json({ OK: false });
  } finally {
    //예외가 있든 없든 실행되는 부분
    await client.$disconnect();
  }
}
