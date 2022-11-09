import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import Layout from "./Layout";
import Map from "./Map";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";
import DBget from "./DBupDate";
import Loading from "./Loading";

const DBupDate: NextPage = () => {
  const [time, setTime] = useState<Number[]>([]);
  const [nowTime, setNowTime] = useState<Number[]>([]);

  //현제시간을 nowTime 에 반환
  const 현제시간 = () => {
    const tempTime = new Date();
    const nowYear = tempTime.getFullYear();
    const nowMonth = Number(tempTime.getMonth()) + 1;
    const nowDay = tempTime.getDate();
    const nowHour = tempTime.getHours();
    const nowMinute = tempTime.getMinutes();
    const nowTime = [nowYear, nowMonth, nowDay, nowHour, nowMinute];

    setNowTime(nowTime);
    console.log("지금시간" + nowTime);
  };

  //DB에서 가져온 시간을 30분 추가 시키는 함수 추가된 30분은 time 변수에 들어감
  const 변환30분 = (time: String) => {
    let year = time.substring(0, 4);
    let month = time.substring(5, 7);
    let day = time.substring(8, 10);
    let hour = time.substring(11, 13);
    let minute = time.substring(14, 16);

    //모든 날자 넘버형으로 바꾸고 30분 더하기
    let NumYear = parseInt(year?.toString());
    let NumMonth = parseInt(month?.toString());
    let NumDay = parseInt(day?.toString());
    let NumHour = parseInt(hour?.toString());
    let NumMinute = parseInt(minute?.toString()) + 30;

    if (NumMinute >= 60) {
      NumMinute -= 60;
      NumHour += 1;
      if (NumHour >= 24) {
        NumHour -= 24;
        NumDay += 1;
        if (NumDay >= 30) {
          NumDay = 1;
          NumMonth += 1;
          if (NumMonth >= 12) {
            NumMonth -= 12;
            NumYear += 1;
          }
        }
      }
    }
    const DBtime30 = [NumYear, NumMonth, NumDay, NumHour, NumMinute];
    console.log("DB시간" + DBtime30);
    setTime(DBtime30);
  };

  const 시간비교 = (time: Number[], nowTime: Number[]) => {
    console.log("시간 비교중...");
    //만약 년도가 작으면
    if (time[0] < nowTime[0]) {
      console.log("년도 측정 걸림");
      updata();
      return;
    } else if (time[1] < nowTime[1]) {
      console.log("월 측정 걸림");
      updata();
      return;
    } else if (time[2] < nowTime[2]) {
      console.log("일 측정 걸림");
      updata();
      return;
    } else if (time[3] < nowTime[3]) {
      console.log("시간 측정 걸림");
      updata();
      return;
    } else if (time[4] < nowTime[4]) {
      console.log("분 측정 걸림");
      updata();
      return;
    } else {
      console.log("업데이트 x");
    }
  };

  const updata = () => {
    fetch("api/allDBreset");

    console.log("업데이트 o");
    return <Loading />;
  };

  useEffect(() => {
    fetch("api/getTime")
      .then(res => res.json())
      .then(json => {
        console.log(json.DBtime);
        변환30분(json.DBtime);
        현제시간();
      })
      .then(() => {
        시간비교(time, nowTime);
      });
  }, []);

  return <div></div>;
};

export default DBupDate;
