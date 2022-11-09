import styled from "@emotion/styled";
import { useEffect } from "react";

interface MapProps {
  mylat?: Number;
  mylng?: Number;
  latitude: Number[];
  longitude: Number[];
}

function Map({ mylat, mylng, latitude, longitude }: MapProps) {
  useEffect(() => {
    // console.log(
    //   "Map 컴포넌트호출 = mylat : " +
    //     mylat +
    //     " ary : " +
    //     latitude +
    //     "길이 : " +
    //     latitude.length
    // );
    // console.log(
    //   "Map 컴포넌트호출 = mylog : " +
    //     mylng +
    //     " ary : " +
    //     longitude +
    //     "길이 : " +
    //     longitude.length
    // );

    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        //중심좌표
        const options = {
          center: new window.kakao.maps.LatLng(
            !mylat ? latitude[0] : mylat,
            !mylng ? longitude[0] : mylng
          ),
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);

        //마커 이미지
        var imageSrc =
          "https://cdn.icon-icons.com/icons2/2102/PNG/512/battery_energy_charger_charging_electric_station_tesla_icon_129004.png";

        var imageSize = new window.kakao.maps.Size(30);
        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize
        );
        //만약 선택 화면이면 my마커는 없고 기존 좌표로 마커만 찍기
        if (!mylat) {
          //선택화면

          for (let i = 0; i < latitude.length; i++) {
            const myMarkerPosition = new window.kakao.maps.LatLng(
              !mylat ? latitude[i] : mylat,
              !mylng ? longitude[i] : mylng
            );
            //마커 만들기
            const marker = new window.kakao.maps.Marker({
              position: myMarkerPosition,
              image: latitude.length === 1 ? null : markerImage,
            });

            marker.setMap(map);
          }
        } else {
          //자동화면
          //내 마커
          const myMarkerPosition = new window.kakao.maps.LatLng(mylat, mylng);
          //내마커 만들기
          const marker = new window.kakao.maps.Marker({
            position: myMarkerPosition,
          });
          for (let i = 0; i < latitude.length; i++) {
            const myMarkerPosition = new window.kakao.maps.LatLng(
              latitude[i],
              longitude[i]
            );
            //마커 만들기
            const marker = new window.kakao.maps.Marker({
              position: myMarkerPosition,
              image: markerImage,
            });
            marker.setMap(map);
          }
          marker.setMap(map);
        }
        // 자동pga화면이면 my마커도 만들고 기존 좌표 마커도 만들어야함
      });
    };

    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [!mylat ? latitude[0] : mylat, !mylng ? longitude[0] : mylng]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

export default Map;
