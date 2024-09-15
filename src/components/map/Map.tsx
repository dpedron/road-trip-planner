"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import LocationMarker from "./LocationMarker";
import { IMapProps } from "@/interfaces/mapInterfaces";

export default function Map({ location, zoom }: IMapProps) {
    return (
        <MapContainer
            center={location.latLng}
            zoom={zoom}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            className="w-screen h-screen"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    );
}
