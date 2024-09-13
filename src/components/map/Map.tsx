"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { LatLngLiteral } from "leaflet";
import LocationMarker from "./LocationMarker";

interface IMapProps {
    position: LatLngLiteral;
    zoom: number;
}

export default function Map({ position, zoom }: IMapProps) {
    return (
        <MapContainer
            center={position}
            zoom={zoom}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            className="w-screen h-screen"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker position={position} />
        </MapContainer>
    );
}
