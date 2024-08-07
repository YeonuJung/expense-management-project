import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Appbar from "../../Organism/Appbar/Appbar";
import Sidebar from "../../Organism/Sidebar/Sidebar";
import "./VisitedPlace.scss";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";

setDefaults({
  key: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
  language: "ko" as string,
  region: "kr" as string,
  outputFormat: "json" as OutputFormat.JSON,
});

interface Location {
  lat: number;
  lng: number;
  info: string;
}

const containerStyle = {
  width: "100%",
  height: "800px",
};
function VisitedPlace() {
  const [location, setLocation] = useState<Location[]>([]);
  const addresses: string[] = ["송리단길", "코엑스", "이태원"];
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<Omit<Location, "info">>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        const results = await Promise.all(
          //address는 db에서 받아온 데이터로 대체
          addresses.map((address) => fromAddress(address))
        );
        const locations = results.map((result) => ({
          lat: result.results[0].geometry.location.lat,
          lng: result.results[0].geometry.location.lng,
          info: result.results[0].formatted_address,
        }));
        setLocation(locations);
      } catch (error) {
        console.error("요청 실패");
      }
    };
    fetchCoordinate();
  }, []);

  const handleMarkerClick = (location: Location) => {
      setSelectedMarker({ ...location });
      map?.setZoom(14);
      map?.panTo(location);
  };
  
  const handleInfoWindowCloseClick = () => {
    setSelectedMarker(null);
  };

  return (
    <div className="visitedPlace__container">
      <Sidebar />
      <div className="visitedPlace__content-container">
        <Appbar />
        <div className="visitedPlace__main-container">
          <div className="visitedPlace__detail-container">
            <div className="visitedPlace__title">방문한 장소들</div>
            <div className="visitedPlace__subTitle">
              &nbsp;지출 내역에 추가한 장소를 지도에서 확인하세요.
            </div>
            <div className="visitedPlace__notice">
              ℹ️지출 내역 정보의 품질에 따라 데이터가 지도에 나타나지 않을 수도 있습니다. ℹ️
            </div>
            <LoadScript
              googleMapsApiKey={
                process.env.REACT_APP_GOOGLE_MAP_API_KEY as string
              }
              loadingElement={<div>Loading..."로딩이 계속 발생하는 경우 새로고침 해주세요"</div>}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={(map) => setMap(map)}
                
              >
                {location.map((loc, idx) => (
                  <Marker
                    key={idx}
                    position={loc}
                    onClick={() => handleMarkerClick(loc)}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                    animation={window.google.maps.Animation.DROP}
                    options={{cursor: 'url(data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9AAAAfwAAAOqAAAHqgAAB6sAAA//AAAd/wAAGf8AAAG9AAABtAAAAYAAAAGAAAABgAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////gn///4B///8Af//+AD///AA///wAH//4AB//8AAf//AAH//5AB///wA///8A////D////w////8P////n////////////////////////////////////////////8=), auto' }}
                  ></Marker>
                ))}
                {selectedMarker && (
                  <InfoWindow
                  position={{
                    lat: selectedMarker.lat,
                    lng: selectedMarker.lng,
                  }}
                    onCloseClick={handleInfoWindowCloseClick}
                  >
                    {/* name부분을 같이 보여주는 걸로 하기 */}
                    {/* 밑에 selectedMarker.info는 데이터의 place로 바꾸기 */}
                    <div className="infoWindow__content">{selectedMarker.info}</div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitedPlace;
