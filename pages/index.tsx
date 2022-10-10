import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Map from "../components/Map";
import { useState } from "react";
import { json } from "stream/consumers";

const Home: NextPage = () => {
  const [lat, setLat] = useState(36.8002);
  const [lon, setLon] = useState(127.075);

  fetch("/api/gps")
    .then(res => res.json())
    .then(json => {
      const { lat, lng } = json.location;
      setLat(lat);
      setLon(lng);
      console.log(json.location);
    });

  return (
    <div>
      <Layout />
      <div className="bg-yellow-300 mt-24 py-5">
        <div id="map" className="w-4/6 h-96  ml-5 bg-white">
          <Map latitude={lat} longitude={lon} />
        </div>
      </div>
    </div>
  );
};

export default Home;
