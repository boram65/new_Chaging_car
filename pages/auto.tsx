import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";
import { allChaging } from "@prisma/client";
import List from "../components/List";
import Loading from "../components/Loading";
import DBupDate from "../components/DBupDate";

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const Auto: NextPage = () => {
  const [Lat, setLat] = useState(36.8002); //자신의 위치정보
  const [Lon, setLon] = useState(127.075); //자신의 위치정보
  const [chaging, setChaging] = useState<allChaging[]>([]); //주변 충전소 정보
  //map 한테 보낼 자신의 위치정보 + 주면 충전소 위치정보
  const [llat, setllat] = useState<Number[]>([]); //주변 충전소의 좌표
  const [llng, setllng] = useState<Number[]>([]); //주변 충전소의 죄표
  // fetch("/api/gps")
  //   .then(res => res.json())
  //   .then(json => {
  //     const { lat, lng } = json.location;
  //     console.log(lat, lng);
  //     setLat(lat);
  //     setLon(lng);
  //   });
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 36.8002, lng: 127.075 },
  });
  const [ready, setReady] = useState(false);

  const post = () => {
    //자신의 위치정보를 보내 주변 충전소를 가져옴
    const lat_lng = { Lat, Lon };

    fetch("api/latlng", {
      method: "POST",
      body: JSON.stringify(lat_lng),
    })
      .then(res => res.json())
      .then(json => {
        setChaging(json.alldata);
        //충전소 위치를 배열로 저장
        json.alldata?.map((e: allChaging, idx: any) => {
          setllat(llat => [...llat, e.lat]);
          setllng(llng => [...llng, e.lng]);
        });

        setReady(true);
      });
  };
  // 성공에 대한 로직
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
    setLat(location.coords.latitude);
    setLon(location.coords.longitude);
  };

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    post();
  }, []);

  const 리스트출력 = () => {
    if (chaging.length === 0) return;
    else {
      return <List chaging={chaging} />;
    }
  };

  return !ready ? (
    <Loading />
  ) : (
    <div>
      <DBupDate />
      <Layout logOff={false} />
      <div className="mt-24"></div>
      <div className="bg-gradient-to-t bg-yellow-300 from-lime-300 mt-5 py-5 h-[30rem] flex justify-center">
        <div
          id="map"
          className="w-10/12 h-full my-0 bg-white rounded-2xl shadow-xl"
        >
          <Map mylat={Lat} mylng={Lon} latitude={llat} longitude={llng} />
        </div>
      </div>
      <div className="flex justify-center">{리스트출력()}</div>
    </div>
  );
};

export default Auto;
