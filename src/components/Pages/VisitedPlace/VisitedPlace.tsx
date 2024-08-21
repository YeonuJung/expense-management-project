import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Libraries,
  
} from "@react-google-maps/api";
import "./VisitedPlace.scss";
import { useEffect, useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import supabase from "../../../api/base";
import { useAuth } from "../../../hooks/useAuth";

const libraries: Libraries = ["places"];

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
  name: string;
}

const containerStyle = {
  width: "100%",
  height: "800px",
};
const customMapStyles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#111827" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#111827" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#5048e5" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [{ color: "#5048e5" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#10B981" }],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#10B981" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#10B981" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#5048e5" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [{ color: "#5048e5" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#374151" }],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#1f2937" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#10B981" }],
  },
  {
    featureType: "poi.business",
    elementType: "geometry.fill",
    stylers: [{ color: "#5048e5" }],
  },
  {
    featureType: "poi.business",
    elementType: "labels.text.fill",
    stylers: [{ color: "#10B981" }],
  },
  {
    featureType: "poi.business",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#111827" }],
  },
];
function VisitedPlace() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY as string,
    libraries: libraries,
  });
  const [location, setLocation] = useState<Location[]>([]);
  const [data, setData] = useState<{place: string | null, name: string}[]>([])
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center] = useState<Omit<Location, "info" | "name">>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [selectedMarker, setSelectedMarker] = useState<Location | null>(null);
  const [hoveredMarker, setHoveredMarker] = useState<Location | null>(null);

  const session = useAuth();
  const onLoad = (map: google.maps.Map) => {
    setMap(map);
    
  };
  useEffect(() => {
    const fetchAddresses = async (): Promise<void> => {
      if(session){
        const { data } = await supabase
        .from("expenserecord")
        .select("place, name")
        .eq("user_id", session.user.id);
        if(data && data.length > 0){
          setData(data)
        }
      }
    };
    fetchAddresses();
  }, [session]);

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        const results = await Promise.all(
          data
          .filter((record: { place: string | null, name: string }) => record.place)
          .map((record: { place: string | null, name: string }) =>
            fromAddress(record.place!).then(result => ({ result, name: record.name }))
          )  
        );
        console.log(results);
        const locations = results.map((result) => ({
          lat: result.result.results[0].geometry.location.lat,
          lng: result.result.results[0].geometry.location.lng,
          info: result.result.results[0].formatted_address,
          name: result.name, 
        }));
        setLocation(locations);
      } catch (error) {
        console.error("요청 실패");
      }
    };
    fetchCoordinate();
  }, [data]);


  const handleMarkerClick = (location: Location) => {
    setSelectedMarker({ ...location });
    map?.setZoom(14);
    map?.panTo(location);
  };

  const handleInfoWindowCloseClick = () => {
    setSelectedMarker(null);
  };

  const handleMarkerHover = (location: Location) => {
    setHoveredMarker({ ...location });
  };
  const handleMarkerUnhover = () => {
    setHoveredMarker(null);
  };
  if (loadError) {
    return <div>Error loading Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <div className="visitedPlace__main-container">
      <div className="visitedPlace__detail-container">
        <div className="visitedPlace__title">방문한 장소들</div>
        <div className="visitedPlace__subTitle">
          &nbsp;지출 내역에 추가한 장소를 지도에서 확인하세요.
        </div>
        <div className="visitedPlace__notice">
          ℹ️지출 내역 정보의 품질에 따라 데이터가 지도에 나타나지 않을 수도
          있습니다. ℹ️
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          onLoad={onLoad}
          options={{ styles: customMapStyles }}
        >
          {location.map((loc, idx) => (
            <Marker
              key={idx}
              position={loc}
              onClick={() => handleMarkerClick(loc)}
              onMouseOver={() => handleMarkerHover(loc)}
              onMouseOut={handleMarkerUnhover}
              icon={{
                url: `http://maps.google.com/mapfiles/ms/icons/yellow-dot.png`,
                scaledSize: new window.google.maps.Size(45, 45),
              }}
              animation={window.google.maps.Animation.DROP}
              options={{
                cursor:
                  "url(data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9AAAAfwAAAOqAAAHqgAAB6sAAA//AAAd/wAAGf8AAAG9AAABtAAAAYAAAAGAAAABgAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////gn///4B///8Af//+AD///AA///wAH//4AB//8AAf//AAH//5AB///wA///8A////D////w////8P////n////////////////////////////////////////////8=), auto",
              }}
            ></Marker>
          ))}
          {(selectedMarker || hoveredMarker) && (
            <InfoWindow
              position={{
                lat: (selectedMarker || hoveredMarker)?.lat as number,
                lng: (selectedMarker || hoveredMarker)?.lng as number,
              }}
              onCloseClick={handleInfoWindowCloseClick}
              options={{ pixelOffset: new window.google.maps.Size(0, -55) }}
            >
              <div className="infoWindow__content">
                <div className="infoWindow__name">{(selectedMarker || hoveredMarker)?.name}</div>
                <div className="infoWindow__place">{(selectedMarker || hoveredMarker)?.info}</div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default VisitedPlace;
