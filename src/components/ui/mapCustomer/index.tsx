"use client";

/*
 * src/ui/components/mapCustomer/index.tsx
 * Component to display a map with markers for each spot
 * code: @aurelienLRY
 */


/* librairie react */
import { useEffect } from "react";
/* librairie leaflet */
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds } from "leaflet";

/* Types */
import { ISpot } from "@/types";
import Image from "next/image";

/**
 * Component to display a map with markers for each spot.
 * @param spots - The spots to be displayed on the map.
 */
function MapCustomer({ spots , className }: { spots: ISpot[ ] | null , className?: string }) {

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     console.log('window is defined');
  //   }
  //   // Retourner undefined au lieu de null
  //   return undefined;
  // }, []);

  const SetViewComponent = ({ spots }: { spots: ISpot[] }) => {
    const map = useMap();
    useEffect(() => {
      if (spots && spots.length > 0) {
        const bounds = getBounds(spots);
        map.fitBounds(bounds);
      }
    }, [spots, map]);
    return null;
  };


if (spots === null) return null;
  return (
    <MapContainer 
      center={[0, 0]} 
      zoom={9} 
      className={`box-border rounded-l-[0.8em] min-w-[350px] min-h-[450px] h-[60%] w-full shadow-lg relative ${className}`} 
    >
      <SetViewComponent spots={spots} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {spots.map((spot: ISpot) => (
        <Marker
          key={spot._id}
          position={convertGpsCoordinates(spot.gpsCoordinates)}
          icon={markerIcon(spot)}
        >
          <Popup interactive>
            <div className="w-full min-w-[300px] min-h-fit rounded-[1em] overflow-hidden flex flex-col items-center justify-center">
              {spot.photo && (
                  <picture className=" overflow-hidden">
                    <Image
                      src={spot.photo}
                      alt={`Photo de ${spot.name}`}
                  
                      className="rounded-t-[1em]  object-cover"
                      width={350}
                      height={150}
                    />
                  </picture>
              )}
              <div className="tooltip-body w-full h-min max-w-[300px] flex flex-col items-center justify-center gap-[0.5em] whitespace-pre-wrap break-words overflow-wrap-break-word max-h-[200px]">
                <h3 className="font-title text-2xl">{spot.name}</h3>
                {spot.description && (
                  <div className="content text-sm overflow-y-auto p-[0.5em]">{spot.description}</div>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

/**
 * Converts GPS coordinates from a string format to an array format.
 * @param gpsCoordinates - The GPS coordinates in string format (e.g., "latitude,longitude").
 * @returns The GPS coordinates in array format [latitude, longitude].
 */
function convertGpsCoordinates(gpsCoordinates: string): [number, number] {
  const gps = gpsCoordinates.split(",");
  return [parseFloat(gps[0]), parseFloat(gps[1])];
}

/**
 * Calculates the bounds of the map based on the spots' GPS coordinates.
 * @param spots - The spots to calculate the bounds from.
 * @returns The bounds of the map.
 */
const getBounds = (spots: ISpot[]): LatLngBounds => {
  const coordinates = spots.map(spot => convertGpsCoordinates(spot.gpsCoordinates));
  return new LatLngBounds(coordinates);
};

// Export the component using `dynamic` to disable server-side rendering
export default MapCustomer;

/**
 * Determines the marker icon based on the spot's practiced activities.
 * @param spot - The spot to determine the marker icon for.
 * @returns The marker icon for the spot.
 */
const markerIcon = (spot: ISpot) => {
  const { practicedActivities } = spot;
  // handle if the array has multiple activities
  if (practicedActivities.length > 1) {
    return markerEscalade;
  }
  // otherwise, get the activity
  const activity = practicedActivities[0].activityName.toLocaleLowerCase().trim();
  console.log("spot", spot);
  console.log("practicedActivities", practicedActivities);
  console.log("activity", activity);

  switch (activity) {
    case "escalade":      return markerEscalade;
    case "randonée aquatique":return markerCanyoning;
    case "canyoning":return markerCanyoning;
    case "canyoning sportif":return markerCanyoning;
    case "spéléologie":return markerSpeleo;
    case "spéléologie découverte":return markerSpeleo;
    case "spéléologie sportive":      return markerSpeleo;
    case "via corda":      return markerViaCorda;

    default:
      return markerEscalade;
  }
};
/* Custom marker icons */
const markerEscalade = new Icon({
  iconUrl: "/icon/_markerEscalade.svg",
  iconSize: [100, 100],
  iconAnchor: [50, 90],
});

const markerCanyoning = new Icon({
  iconUrl: "/icon/_markerCanyoning.svg",
  iconSize: [100, 100],
  iconAnchor: [50, 90],
});

const markerSpeleo = new Icon({
  iconUrl: "/icon/_markerSpeleo.svg",
  iconSize: [100, 100],
  iconAnchor: [50, 90],
});

const markerViaCorda = new Icon({
  iconUrl: "/icon/_markerViaCorda.svg",
  iconSize: [100, 100],
  iconAnchor: [50, 90],
});
