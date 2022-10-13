import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Map from "../components/Map";
import { useState, useEffect } from "react";
import { json } from "stream/consumers";
import DBget from "../components/DBupDate";
import DBupDate from "../components/DBupDate";

const Test: NextPage = () => {
  return (
    <div>
      <DBupDate />
    </div>
  );
};

export default Test;
