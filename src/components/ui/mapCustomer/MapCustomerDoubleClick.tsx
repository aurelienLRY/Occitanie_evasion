"use client";

/*
 * src/ui/components/mapCustomer/MapCustomerDoubleClick.tsx
 * Component to display a map with markers for each spot
 * Version avec système de double-clic pour activer l'interactivité
 * code: @aurelienLRY
 */

/* librairie react */
import { useEffect, useState } from "react";
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
function MapCustomerDoubleClick({ spots, className }: { spots: ISpot[] | null, className?: string }) {
  const [isInteractive, setIsInteractive] = useState(false);

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

  const MapController = () => {
    const map = useMap();
    
    useEffect(() => {
      // Désactiver toutes les interactions par défaut
      map.scrollWheelZoom.disable();
      map.dragging.disable();
      map.doubleClickZoom.disable();
      map.touchZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    }, [map]);

    useEffect(() => {
      if (isInteractive) {
        // Activer toutes les interactions
        map.scrollWheelZoom.enable();
        map.dragging.enable();
        map.doubleClickZoom.enable();
        map.touchZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
      } else {
        // Désactiver toutes les interactions
        map.scrollWheelZoom.disable();
        map.dragging.disable();
        map.doubleClickZoom.disable();
        map.touchZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
      }
    }, [isInteractive, map]);

    return null;
  };

  const handleMapClick = () => {
    if (!isInteractive) {
      setIsInteractive(true);
    }
  };

  const handleDeactivateClick = () => {
    setIsInteractive(false);
  };

  if (spots === null) return null;

  return (
    <div className="w-full h-full relative">
      {/* Indicateur d'état */}
      {!isInteractive && (
        <div className="absolute top-4 left-4 z-[1000] bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium">
          Double-cliquez sur la carte pour l'activer
        </div>
      )}
      
      {isInteractive && (
        <div className="absolute top-4 right-4 z-[1000]">
          <button
            onClick={handleDeactivateClick}
            className="bg-red-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Désactiver la carte
          </button>
        </div>
      )}

      <MapContainer 
        center={[0, 0]} 
        zoom={9} 
        className={`box-border rounded-l-[0.8em] min-w-[350px] min-h-[450px] h-[60%] w-full shadow-lg relative ${className}`}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <MapController />
        <SetViewComponent spots={spots} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {spots.map((spot: ISpot) => (
          <Marker
            key={spot._id}
            position={convertGpsCoordinates(spot.gpsCoordinates)}
            icon={markerIcon(spot)}
            eventHandlers={{
              click: handleMapClick
            }}
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
    </div>
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

  switch (activity) {
    case "escalade":      return markerEscalade;
    case "randonée aquatique":return markerCanyoning;
    case "canyoning":return markerCanyoning;
    case "canyoning sportif":return markerCanyoning;
    case "spéléologie":return markerSpeleo;
    case "speleologie":return markerSpeleo;
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

export default MapCustomerDoubleClick;
