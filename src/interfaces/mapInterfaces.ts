import { LatLngLiteral } from "leaflet";

export interface Iposition {
    latLng: LatLngLiteral;
    informations: {
        road: string;
        postcode: string;
        city: string;
        village: string;
        country: string;
    };
}

export interface IMapProps {
    position: Iposition;
    zoom: number;
}
