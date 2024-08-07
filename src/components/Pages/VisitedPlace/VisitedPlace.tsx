import { Marker, APIProvider, Map } from "@vis.gl/react-google-maps";
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
}
function VisitedPlace() {
  const [location, setLocation] = useState<Location[]>([]);
  const addresses: string[] = ["송리단길", "코엑스", "이태원"];

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        const results = await Promise.all(
          addresses.map((address) => fromAddress(address))
        );
        console.log(results)
        const coordinates: Location[] = results.map((result) => result.results[0].geometry.location);
        setLocation(coordinates)
      } catch (error) {
        console.error("요청 실패");
      }
    };
  fetchCoordinate()
  }, []);
console.log(location)

  return (
    <div className="visitedPlace__container">
      <Sidebar />
      <div className="visitedPlace__content-container">
        <Appbar />
        <div className="visitedPlace__main-container">
          <div className="visitedPlace__detail-container">
            <div className="visitedPlace__title">Visited Places</div>
            <div className="visitedPlace__subTitle">
              &nbsp;Check out the places on the map that you added in your
              spending history
            </div>
            <div className="visitedPlace__notice">
              ℹ️Depending on the quality of your spending history information,
              data may not appear on the map.ℹ️
            </div>
            <APIProvider
              apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY as string}
            >
              <Map
                defaultZoom={10}
                defaultCenter={{ lat: 37.56672, lng: 126.9782 }}
              >
                {location.map((cor, idx) => <Marker key={idx} position={cor}></Marker>)}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitedPlace;
