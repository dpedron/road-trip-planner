"use client";

import MapComponentHook from "@/hooks/useMapComponent";
import { useItinerariesStore } from "@/stores/itinerariesStore";
import { useLocationsStore } from "@/stores/locationsStore";
import { fetchItineraries } from "@/utils/fetchUtils";
import { decodePolyline } from "@/utils/itineraryUtils";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";

export default function MapComponent() {
    const { itineraries, addItinerary } = useItinerariesStore((state) => state);
    const { locations } = useLocationsStore((state) => state);

    useEffect(() => {
        if (locations.length > 1) {
            fetchItineraries(locations, itineraries, addItinerary);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [locations]);

    return (
        <MapContainer
            center={{ lat: 44.1667, lng: 4.95 }}
            zoom={13}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            className="h-screen w-screen"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <MapComponentHook />

            {locations.map((location, index) => {
                const positionOnMap = location.positionOnMap;
                const nextLocation = locations[index + 1];

                if (nextLocation) {
                    const itineraryKey = `${positionOnMap}-${nextLocation.positionOnMap}`;
                    const itinerary = itineraries[itineraryKey];

                    if (itinerary) {
                        const route = itinerary.routes[0];
                        const decodedPolyline = decodePolyline(route.geometry);
                        return (
                            <Polyline
                                key={itineraryKey}
                                positions={decodedPolyline}
                                color="blue"
                            />
                        );
                    }
                }

                return null;
            })}
        </MapContainer>
    );
}
