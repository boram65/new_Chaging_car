import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { allChaging } from "@prisma/client";
import { useSession } from "next-auth/react";

interface ListProps {
  title?: String;
  chaging: allChaging[];
}

export default function Layout({ chaging }: ListProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [myListStat, setMyListStat] = useState("");
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
  const kind = (ele: String) => {
    switch (ele) {
      case "A0":
        return "공공시설";
      case "B0":
        return "주차시설";
      case "C0":
        return "휴게시설";
      case "D0":
        return "관광시설";
      case "E0":
        return "상업시설";
      case "F0":
        return "차량정비시설";
      case "G0":
        return "기타시설";
      case "H0":
        return "공동주택시설";
      case "I0":
        return "근린생활시설";
      case "J0":
        return "교육문화시설";
    }
  };

  const kindD = (ele: String) => {
    switch (ele) {
      case "A001":
        return "관공서";
      case "A002":
        return "주민센터";
      case "A003":
        return "공공기관";
      case "A004":
        return "지자체시설";
      case "B001":
        return "공영주차장";
      case "B002":
        return "공원주차장";
      case "B003":
        return "환승주차장";
      case "B004":
        return "일반주차장";
      case "C001":
        return "고속도로 휴게소";
      case "C002":
        return "지방도로 휴게소";
      case "C003":
        return "쉼터";
      case "D001":
        return "공원";
      case "D002":
        return "전시관";
      case "D003":
        return "민속마을";
      case "D004":
        return "생태공원";
      case "D005":
        return "홍보관";
      case "D006":
        return "관광안내소";
      case "D007":
        return "관광지";
      case "D008":
        return "박물관";
      case "D009":
        return "유적지";
      case "E001":
        return "마트(쇼핑몰)";
      case "E002":
        return "백화점";
      case "E003":
        return "숙박시설";
      case "E004":
        return "골프장(cc)";
      case "E005":
        return "카페";
      case "E006":
        return "음식점";
      case "E007":
        return "주유소";
      case "E008":
        return "영화관";
      case "F001":
        return "서비스센터";
      case "F002":
        return "정비소";
      case "G001":
        return "군부대";
      case "G002":
        return "야영장";
      case "G003":
        return "공중전화부스";
      case "G004":
        return "기타";
      case "G005":
        return "오피스텔";
      case "G006":
        return "단독주택";
      case "H001":
        return "아파트";
      case "H002":
        return "빌라";
      case "H003":
        return "사업장(사옥)";
      case "H004":
        return "기숙사";
      case "H005":
        return "연립주택";
      case "I001":
        return "병원";
      case "I002":
        return "종교시설";
      case "I003":
        return "보건소";
      case "I004":
        return "경찰서";
      case "I005":
        return "도서관";
      case "I006":
        return "복지관";
      case "I007":
        return "수련원";
      case "I008":
        return "금융기관";
      case "J001":
        return "학교";
      case "J002":
        return "교육원";
      case "J003":
        return "학원";
      case "J004":
        return "공연장";
      case "J005":
        return "관람장";
      case "J006":
        return "동식물원";
      case "J007":
        return "경기장";
    }
  };
  const chgLimitYn = (limit: String) => {
    if (limit === "Y") return "충전이용 제한 !";
    else return "이용제한 없음";
  };
  // (1 통신이상 2충전대기 3충전중 4운영중지 5점검중 9상태미확인)
  const stat = (ele: String) => {
    switch (ele) {
      case "1":
        return "통신이상 🔴";
      case "2":
        return "충전대기 🟢";
      case "3":
        return "충전중 🔵";
      case "4":
        return "운영중지 ⚫️";
      case "5":
        return "점검중 🔴";
      case "9":
        return "상태미확인 🟠";
    }
  };

  const date = (ele: String) => {
    if (ele === "") {
      return "정보 없음";
    }

    const year = ele.substring(0, 4);
    const month = ele.substring(4, 6);
    const day = ele.substring(6, 8);
    const hour = ele.substring(8, 10);
    const minute = ele.substring(10, 12);
    const second = ele.substring(12, 14);

    return year + "년" + month + "월" + day + "일";
  };

  const time = (ele: String) => {
    if (ele === "") {
      return "";
    }
    const hour = ele.substring(8, 10);
    const minute = ele.substring(10, 12);
    const second = ele.substring(12, 14);

    return hour + " : " + minute + " : " + second;
  };

  const 즐겨찾기 = (
    statNm: String,
    statId: String,
    chgerId: String,
    chgerType: String,
    addr: String,
    stat: String
  ) => {
    //authenticated   로그인 상테
    //unauthenticated   로그아웃 상태
    if (status === "authenticated") {
      const userdata = {
        email: session?.user?.email,
        statNm,
        statId,
        chgerId,
        chgerType,
        addr,
        stat,
      };
      console.log("로그인됨");
      fetch(`api/user/findUser`, {
        method: "POST",
        body: JSON.stringify(userdata),
      })
        .then(res => res.json())
        .then(json => {
          setMyListStat(json.stat);
          alert(json.stat);
          //즐찾 알림 하기
        });
    }
  };

  return (
    <div className="w-11/12 flex flex-wrap justify-center">
      {chaging.map((e: allChaging, idx: any, chag: allChaging[]) => {
        return (
          <div className="flex items-center mt-10 w-5/12" key={idx}>
            <div>
              <button
                className="text-3xl w-12 h-12"
                onClick={() => {
                  즐겨찾기(
                    e.statNm,
                    e.statId,
                    e.chgerId,
                    e.chgerType,
                    e.addr,
                    e.stat
                  );
                }}
              >
                ⭐️
              </button>
            </div>
            <div className="w-5/6 h-72 rounded-xl bg-gradient-to-r bg-lime-300 from-yellow-300 shadow-xl">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold ml-5 mt-2 text-gray-700">
                  {e.statNm}
                </div>
                <div className="text-sm mr-5 mt-2 font-bold text-gray-700 bg-teal-100 px-2 rounded-2xl shadow-2xl border border-gray-700 ">
                  {chgChgerType(e.chgerType)}
                </div>
              </div>
              <div className="mx-5 my-2 ">
                <div className="font-bold text-gray-700 text-base">
                  {e.addr}
                </div>
                <div>
                  {kind(e.kind)}
                  {!kindD(e.kindDetail) ? "" : " (" + kindD(e.kindDetail) + ")"}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-base ml-5">
                  무료 주차: {e.parkingFree === "Y" ? "🟢" : "🔴"}
                </div>
                <div className="mr-5 my-2 text-lg bg-white p-1 rounded-2xl shadow-2xl border-2 border-cyan-500">
                  {stat(e.stat)}
                </div>
              </div>

              <div className="mx-5 flex justify-between">
                <div className="text-red-600 font-bold text-sm">
                  {e.limitYn === "N" ? " " : e.limitDetail}
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <div className=" items-center mx-5 border border-black rounded-lg p-1">
                  <div className="flex justify-center text-sm">
                    마지막 충전 시작
                  </div>
                  <div className="flex justify-center text-sm">
                    {date(e.lastTsdt)}
                  </div>
                  <div className="flex justify-center text-sm">
                    {time(e.lastTsdt)}
                  </div>
                </div>
                <div className=" items-center mx-5 border border-black rounded-lg p-1">
                  <div className="flex justify-center text-sm">
                    마지막 충전 종료
                  </div>
                  <div className="flex justify-center text-sm">
                    {date(e.lastTedt)}
                  </div>
                  <div className="flex justify-center text-sm">
                    {time(e.lastTedt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          // <div className="mt-2 w-full" key={idx}>
          //   {chag[idx].statNm !== chag[idx - 1]?.statNm ? (
          //     <div className="bg-red-200">
          //       <div className="text-xl font-bold bg-red-200">{e.statNm}</div>
          //     </div>
          //   ) : null}

          //   <div className="bg-yellows-300 m-5 h-44 w-44">
          //     <div>주소 : {e.statNm}</div>
          //     <div>코드id : {e.chgerId}</div>
          //     <div>충전소 : {e.statId}</div>
          //   </div>
          // </div>
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
