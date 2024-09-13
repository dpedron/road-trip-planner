"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import LocationMarker from "./LocationMarker";
import { IMapProps } from "@/interfaces/mapInterfaces";

export default function Map({ position, zoom }: IMapProps) {
    console.log(position.informations);
    return (
        <MapContainer
            center={position.latLng}
            zoom={zoom}
            scrollWheelZoom={true}
            doubleClickZoom={false}
            className="w-screen h-screen"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
                position={{
                    latLng: position.latLng,
                    informations: position.informations,
                }}
            />
        </MapContainer>
    );
}
