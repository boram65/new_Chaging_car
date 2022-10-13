import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";
import { Dna, Triangle } from "react-loader-spinner";

export default function Logo() {
  return (
    <div>
      <Triangle
        height="80"
        width="80"
        color="#000000"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
}
