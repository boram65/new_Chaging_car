import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { Dna } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="bg-gradient-to-t bg-lime-300 from-yellow-400 py-60">
      <div className="flex justify-center items-center">
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      <div className="flex justify-center text-5xl text-gray-700">
        로딩중...
      </div>
    </div>
  );
}
