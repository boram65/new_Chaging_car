import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

const Auto: NextPage = () => {
  const [Lat, setLat] = useState(36.8002);
  const [Lon, setLon] = useState(127.075);

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
  }, []);

  return (
    <div>
      <Layout />
      <div className="bg-yellow-300 mt-24 py-5">
        <div id="map" className="w-4/6 h-96  ml-5 bg-white">
          <Map
            latitude={Number(location.coordinates?.lat)}
            longitude={Number(location.coordinates?.lng)}
          />
        </div>
      </div>
    </div>
  );
};

export default Auto;
