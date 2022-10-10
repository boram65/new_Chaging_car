import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";

interface LayoutProps {
  title: String;
}

export default function Layout() {
  const [lat, setLat] = useState(36.8002);
  const [lon, setLon] = useState(127.075);

  return (
    <div>
      <div className="bg-yellow-300">
        <div className="flex justify-around">
          <Link href={"/"}>
            <button className="font-bold text-2xl w-full h-20 border-r border-gray-300 hover:bg-yellow-400 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              지동위치 검색
            </button>
          </Link>
          <Link href={"/choi"}>
            <button className="font-bold text-2xl w-full h-20 border-l border-gray-300 hover:bg-yellow-400 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              선택위치검색
            </button>
          </Link>
        </div>
        {/* 로그인 */}
        <div className="flex float-right mr-5 mt-5">
          <div>
            <div>
              <input
                type={"email"}
                placeholder=" e-mail"
                className="bg-white border mr-2"
              ></input>
            </div>
            <div>
              <input
                type={"password"}
                placeholder=" password"
                className="bg-white border mr-2"
              ></input>
            </div>
          </div>
          <button className="w-20 bg-white border mr-2">로그인</button>
          <button className="w-20 bg-white border mr-2">회원가입</button>
        </div>
      </div>
    </div>
  );
}
