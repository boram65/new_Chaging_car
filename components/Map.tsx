import styled from "@emotion/styled";
import { useEffect } from "react";

interface MapProps {
  mylat: Number;
  mylng: Number;
  latitude: Number[];
  longitude: Number[];
}

function Map({ mylat, mylng, latitude, longitude }: MapProps) {
  useEffect(() => {
    console.log(
      "Map 컴포넌트호출 = mylat : " +
        mylat +
        " ary : " +
        latitude +
        "길이 : " +
        latitude.length
    );
    console.log(
      "Map 컴포넌트호출 = mylog : " +
        mylng +
        " ary : " +
        longitude +
        "길이 : " +
        longitude.length
    );

    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(mylat, mylng),
          level: 5,
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(mylat, mylng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [mylat, mylng]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

export default Map;
