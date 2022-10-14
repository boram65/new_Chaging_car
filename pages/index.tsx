import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { platform } from "os";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Map from "../components/Map";
import { useCallback, useEffect, useState } from "react";
import { json } from "stream/consumers";
import { allChaging } from "@prisma/client";
import List from "../components/List";
import Loading from "../components/Loading";
import DBupDate from "../components/DBupDate";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const [lat, setLat] = useState([36.8002]);
  const [lon, setLon] = useState([127.075]);
  const [finalcode, setFinalcode] = useState("00000");
  const [chaging, setChaging] = useState<allChaging[]>([]);
  const [llat, setllat] = useState<Number[]>([]); //주변 충전소의 좌표
  const [llng, setllng] = useState<Number[]>([]); //주변 충전소의 죄표
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sido, setSido] = useState([
    { name: "서울특별시", code: "11" },
    { name: "부산광역시", code: "26" },
    { name: "대구광역시", code: "27" },
    { name: "인천과역시", code: "28" },
    { name: "광주광역시", code: "29" },
    { name: "대전광역시", code: "30" },
    { name: "울산광역시", code: "31" },
    { name: "세종특별자치시", code: "36" },
    { name: "경기도", code: "41" },
    { name: "강원도", code: "42" },
    { name: "충청북도", code: "43" },
    { name: "충청남도", code: "44" },
    { name: "전라북도", code: "45" },
    { name: "전라남도", code: "46" },
    { name: "경상북도", code: "47" },
    { name: "경상남도", code: "48" },
    { name: "제주특별자치도", code: "50" },
  ]);
  const [sigungu, setSigungu] = useState([
    { name: "시도를 선택하세요", code: "00000" },
  ]);

  const 시도선택 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.currentTarget.value) {
      case "11": //서울
        setSigungu([
          { name: "종로구", code: "11110" },
          { name: "중구", code: "11140" },
          { name: "용산구", code: "11170" },
          { name: "성동구", code: "11200" },
          { name: "광진구", code: "11215" },
          { name: "동대문구", code: "11230" },
          { name: "중랑구", code: "11260" },
          { name: "성북구", code: "11290" },
          { name: "강북구", code: "11305" },
          { name: "도봉구", code: "11320" },
          { name: "노원구", code: "11350" },
          { name: "은평구", code: "11380" },
          { name: "서대문구", code: "11410" },
          { name: "마포구", code: "11440" },
          { name: "양천구", code: "11470" },
          { name: "강서구", code: "11500" },
          { name: "구로구", code: "11530" },
          { name: "금천구", code: "11545" },
          { name: "영등포구", code: "11560" },
          { name: "동작구", code: "11590" },
          { name: "관악구", code: "11620" },
          { name: "서초구", code: "11650" },
          { name: "강남구", code: "11680" },
          { name: "송파구", code: "11710" },
          { name: "강동구", code: "11740" },
        ]);
        break;
      case "26":
        setSigungu([
          { name: "서구", code: "26140" },
          { name: "동구", code: "26170" },
          { name: "영도구", code: "26200" },
          { name: "부산진구", code: "26230" },
          { name: "동래구", code: "26260" },
          { name: "남구", code: "26290" },
          { name: "북구", code: "26320" },
          { name: "해운대구", code: "26350" },
          { name: "사하구", code: "26380" },
          { name: "금정구", code: "26410" },
          { name: "강서구", code: "26440" },
          { name: "연제구", code: "26470" },
          { name: "수영구", code: "26500" },
          { name: "사상구", code: "26530" },
          { name: "기장군", code: "26710" },
        ]);
        break;
      case "27":
        setSigungu([
          { name: "중구", code: "27110" },
          { name: "동구", code: "27140" },
          { name: "서구", code: "27170" },
          { name: "남구", code: "27200" },
          { name: "북구", code: "27230" },
          { name: "수성구", code: "27260" },
          { name: "달서구", code: "27290" },
          { name: "달성군", code: "27710" },
        ]);
        break;
      case "28":
        setSigungu([
          { name: "중구", code: "28110" },
          { name: "동구", code: "28140" },
          { name: "미추홀구", code: "28177" },
          { name: "연수구", code: "28185" },
          { name: "남동구", code: "28200" },
          { name: "부평구", code: "28237" },
          { name: "계양구", code: "28245" },
          { name: "서구", code: "28260" },
          { name: "강화군", code: "28710" },
          { name: "옹진군", code: "28720" },
        ]);
        break;
      case "29":
        setSigungu([
          { name: "동구", code: "29110" },
          { name: "서구", code: "29140" },
          { name: "남구", code: "29155" },
          { name: "북구", code: "29170" },
          { name: "광산구", code: "29200" },
        ]);
        break;
      case "30":
        setSigungu([
          { name: "동구", code: "30110" },
          { name: "중구", code: "30140" },
          { name: "서구", code: "30170" },
          { name: "유성구", code: "30200" },
          { name: "대덕구", code: "30230" },
        ]);
        break;
      case "31":
        setSigungu([
          { name: "중구", code: "31110" },
          { name: "남구", code: "31140" },
          { name: "동구", code: "31170" },
          { name: "북구", code: "31200" },
          { name: "울주군", code: "31710" },
        ]);
        break;
      case "36":
        setSigungu([{ name: "세종특별자치시", code: "36110" }]);
        break;
      case "41":
        setSigungu([
          { name: "수원시", code: "41110" },
          { name: "성남시", code: "41130" },
          { name: "의정부시", code: "41150" },
          { name: "안양시", code: "41170" },
          { name: "부천시", code: "41190" },
          { name: "광명시", code: "41210" },
          { name: "평택시", code: "41220" },
          { name: "동두천시", code: "41250" },
          { name: "안산시", code: "41270" },
          { name: "고양시", code: "41280" },
          { name: "과천시", code: "41290" },
          { name: "구리시", code: "41310" },
          { name: "남양주시", code: "41360" },
          { name: "오산시", code: "41370" },
          { name: "시흥시", code: "41390" },
          { name: "군포시", code: "41410" },
          { name: "의왕시", code: "41430" },
          { name: "하남시", code: "41450" },
          { name: "용인시", code: "41460" },
          { name: "파주시", code: "41480" },
          { name: "이천시", code: "41500" },
          { name: "안성시", code: "41550" },
          { name: "김포시", code: "41570" },
          { name: "화성시", code: "41590" },
          { name: "광주시", code: "41610" },
          { name: "양주시", code: "41630" },
          { name: "포천시", code: "41650" },
          { name: "여주시", code: "41670" },
          { name: "연천군", code: "41800" },
          { name: "가평군", code: "41820" },
          { name: "양평군", code: "41830" },
        ]);
        break;
      case "42":
        setSigungu([
          { name: "춘천시", code: "42110" },
          { name: "원주시", code: "42130" },
          { name: "강릉시", code: "42150" },
          { name: "동해시", code: "42170" },
          { name: "태백시", code: "42190" },
          { name: "속초시", code: "42210" },
          { name: "삼척시", code: "42230" },
          { name: "홍천군", code: "42720" },
          { name: "횡성군", code: "42730" },
          { name: "영월군", code: "42750" },
          { name: "평창군", code: "42760" },
          { name: "정선군", code: "42770" },
          { name: "철원군", code: "42780" },
          { name: "화천군", code: "42790" },
          { name: "양구군", code: "42800" },
          { name: "인제군", code: "42810" },
          { name: "고성군", code: "42820" },
          { name: "양양군", code: "42830" },
        ]);
        break;
      case "43":
        setSigungu([
          { name: "청주시", code: "43110" },
          { name: "충주시", code: "43130" },
          { name: "제천시", code: "43150" },
          { name: "보은군", code: "43720" },
          { name: "옥천군", code: "43730" },
          { name: "영동군", code: "43740" },
          { name: "증평군", code: "43745" },
          { name: "진천군", code: "43750" },
          { name: "괴산군", code: "43760" },
          { name: "음성군", code: "43770" },
          { name: "단양군", code: "43800" },
        ]);
        break;
      case "44":
        setSigungu([
          { name: "천안시", code: "44130" },
          { name: "공주시", code: "44150" },
          { name: "보령시", code: "44180" },
          { name: "아산시", code: "44200" },
          { name: "서산시", code: "44210" },
          { name: "논산시", code: "44230" },
          { name: "계룡시", code: "44250" },
          { name: "당진시", code: "44270" },
          { name: "금산군", code: "44710" },
          { name: "부여군", code: "44760" },
          { name: "서천군", code: "44770" },
          { name: "청양군", code: "44790" },
          { name: "홍성군", code: "44800" },
          { name: "예산군", code: "44810" },
          { name: "태안군", code: "44825" },
        ]);
        break;
      case "45":
        setSigungu([
          { name: "전주시", code: "45110" },
          { name: "군산시", code: "45130" },
          { name: "익산시", code: "45140" },
          { name: "정읍시", code: "45180" },
          { name: "남원시", code: "45190" },
          { name: "김제시", code: "45210" },
          { name: "완주군", code: "45710" },
          { name: "진안군", code: "45720" },
          { name: "무주군", code: "45730" },
          { name: "장수군", code: "45740" },
          { name: "임실군", code: "45750" },
          { name: "순창군", code: "45770" },
          { name: "고창군", code: "45790" },
          { name: "부안군", code: "45800" },
        ]);
        break;
      case "46":
        setSigungu([
          { name: "목포시", code: "46110" },
          { name: "여수시", code: "46130" },
          { name: "순천시", code: "46150" },
          { name: "나주시", code: "46170" },
          { name: "광양시", code: "46230" },
          { name: "담양군", code: "46710" },
          { name: "곡성군", code: "46720" },
          { name: "구례군", code: "46730" },
          { name: "고흥군", code: "46770" },
          { name: "보성군", code: "46780" },
          { name: "화순군", code: "46790" },
          { name: "장흥군", code: "46800" },
          { name: "강진군", code: "46810" },
          { name: "해남군", code: "46820" },
          { name: "영암군", code: "46830" },
          { name: "무안군", code: "46840" },
          { name: "함평군", code: "46860" },
          { name: "영광군", code: "46870" },
          { name: "장성군", code: "46880" },
          { name: "완도군", code: "46890" },
          { name: "진도군", code: "46900" },
          { name: "신안군", code: "46910" },
        ]);
        break;
      case "47":
        setSigungu([
          { name: "포항시", code: "47110" },
          { name: "경주시", code: "47130" },
          { name: "김천시", code: "47150" },
          { name: "안동시", code: "47170" },
          { name: "구미시", code: "47190" },
          { name: "영주시", code: "47210" },
          { name: "영천시", code: "47230" },
          { name: "상주시", code: "47250" },
          { name: "문경시", code: "47280" },
          { name: "경산시", code: "47290" },
          { name: "군위군", code: "47720" },
          { name: "의성군", code: "47730" },
          { name: "청송군", code: "47750" },
          { name: "영양군", code: "47760" },
          { name: "영덕군", code: "47770" },
          { name: "청도군", code: "47820" },
          { name: "고령군", code: "47830" },
          { name: "성주군", code: "47840" },
          { name: "칠곡군", code: "47850" },
          { name: "예천군", code: "47900" },
          { name: "봉화군", code: "47920" },
          { name: "울진군", code: "47930" },
          { name: "울릉군", code: "47940" },
        ]);
        break;
      case "48":
        setSigungu([
          { name: "창원시", code: "48120" },
          { name: "진주시", code: "48170" },
          { name: "통영시", code: "48220" },
          { name: "사천시", code: "48240" },
          { name: "김해시", code: "48250" },
          { name: "밀양시", code: "48270" },
          { name: "거제시", code: "48310" },
          { name: "양산시", code: "48330" },
          { name: "의령군", code: "48720" },
          { name: "함안군", code: "48730" },
          { name: "창녕군", code: "48740" },
          { name: "고성군", code: "48820" },
          { name: "남해군", code: "48840" },
          { name: "하동군", code: "48850" },
          { name: "산청군", code: "48860" },
          { name: "함양군", code: "48870" },
          { name: "거창군", code: "48880" },
          { name: "합천군", code: "48890" },
        ]);
        break;
      case "50":
        setSigungu([
          { name: "제주시", code: "50110" },
          { name: "서귀포시", code: "50130" },
        ]);
        break;
    } //시군구 코드 반환
  };

  const 지역코드반환 = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFinalcode(event.currentTarget.value);
  };

  const 지역코드req = () => {
    setLoading(true);
    if (finalcode === "00000") return;
    fetch(`api/id/${finalcode}`, { method: "POST" })
      .then(res => res.json())
      .then(json => {
        setChaging(json.newChaging);
        //충전소 위치를 배열로 저장
        setllat([]);
        setllng([]);
        json.newChaging.map((e: allChaging, idx: any) => {
          setllat(llat => [...llat, e.lat]);
          setllng(llng => [...llng, e.lng]);
        });
        setReady(true);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const 리스트출력 = () => {
    if (chaging.length === 0) return;
    else {
      return <List chaging={chaging} />;
    }
  };

  return !loading ? (
    <div>
      <DBupDate />
      <Layout logOff={false} />
      <div className=" mt-10">
        <select className="w-40 h-8 bg-gray-100 ml-5 mb-1" onChange={시도선택}>
          <option>시,도</option>
          {sido.map((e, idx) => (
            <option key={idx} value={e.code}>
              {e.name}
            </option>
          ))}
        </select>
        <select
          className="w-40 h-8 bg-gray-100 ml-5 mb-1"
          onChange={지역코드반환}
        >
          <option>시,군,구</option>
          {sigungu.map((e, idx) => (
            <option key={idx} value={e.code}>
              {e.name}
            </option>
          ))}
        </select>
        <button
          className="ml-8 rounded-lg bg-lime-300 w-28 h-8"
          onClick={지역코드req}
        >
          검색
        </button>
      </div>
      <div className="bg-gradient-to-t bg-yellow-300 from-lime-300 mt-5 py-5 h-[30rem] flex justify-center">
        <div
          id="map"
          className="w-10/12 h-full my-0 bg-white rounded-2xl shadow-xl"
        >
          <Map
            latitude={ready === false ? lat : llat}
            longitude={ready === false ? lon : llng}
          />
        </div>
      </div>
      <div>{리스트출력()}</div>
    </div>
  ) : (
    <Loading />
  );
};

export default Home;
