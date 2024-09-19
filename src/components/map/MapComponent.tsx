"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import LocationMarker from "./LocationMarker";
import MapComponentHook from "@/hooks/useMapComponent";

export default function MapComponent() {
    return (
        <MapContainer
            center={{ lat: 44.1667, lng: 4.95 }}
            zoom={13}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            className="w-screen h-screen"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
            <MapComponentHook />
        </MapContainer>
    );
}
