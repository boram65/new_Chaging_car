import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { allChaging } from "@prisma/client";

interface ListProps {
  title?: String;
  chaging: allChaging[];
}

const chgChgerType = (type: String) => {
  switch (type) {
    case "01":
      return "DC차데모";
    case "02":
      return "AC완속";
    case "03":
      return "DC차데모+AC3상";
    case "04":
      return "DC콤보";
    case "05":
      return "DC차데모+DC콤보";
    case "06":
      return "DC차데모+AC3상+DC콤보";
    case "07":
      return "AC3상";
  }
};
const chgLimitYn = (limit: String) => {
  if (limit === "Y") return "충전이용 제한 !";
  else return "이용제한 없음";
};

export default function Layout({ chaging }: ListProps) {
  return (
    <div className="mx-16">
      {chaging.map((e: allChaging, idx: any, chag: allChaging[]) => {
        return (
          <div className="mt-2 inline-block" key={idx}>
            {chag[idx].statNm !== chag[idx - 1]?.statNm ? (
              <div className="bg-red-200 inline-block">
                <div className="text-xl font-bold bg-red-200">{e.statNm}</div>
              </div>
            ) : null}
            <div className="bg-yellow-300 m-5">
              <div>주소 : {e.statNm}</div>
              <div>코드id : {e.chgerId}</div>
              <div>충전소 : {e.statId}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
// <div className="flex items-center mt-10">
//   <div>
//     <button className="text-3xl border w-12 h-12">⭐️</button>
//   </div>
//   <div className="w-5/6 h-64 rounded-xl bg-gradient-to-r bg-orange-300 from-yellow-300 shadow-lg">
//     <div className="flex justify-between h-1/5 ml-5">
//       <div className="w-3/6 flex items-center font-bold text-xl">
//         {e.statNm}
//       </div>
//       <div className="w-2/5 flex items-center text-lg">
//         충전타입 : {chgChgerType(e.chgerType)}
//       </div>
//       <div className="w-1/6 flex items-center">
//         {chgLimitYn(e.limitYn)}
//       </div>
//     </div>
//     <div className="h-1/5 ml-5 flex items-center justify-between">
//       <div className="text-lg">{e.addr}</div>
//       <div className="mr-5">충전기 상태: {e.stat}</div>
//     </div>
//     <div className="h-1/5 ml-5 flex items-center">
//       시설 : {e.kind} 상세시설 : {e.kindDetail}
//     </div>
//     <div className="h-1/5 ml-5 ">
//       <div>무료주차 : {e.parkingFree}</div>
//       <div>💣{e.limitDetail}</div>
//     </div>
//     <div className="h-1/5 mx-5 flex justify-between items-center">
//       <div>마지막 충전 시작 : {e.lastTsdt}</div>
//       <div>마지막 충전 종료 : {e.lastTedt}</div>
//     </div>
//   </div>
// </div>
