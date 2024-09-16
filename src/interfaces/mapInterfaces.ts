import { LatLngLiteral } from "leaflet";

export interface ILocationInformations {
    road: string;
    postcode: string;
    country: string;
    city?: string;
    village?: string;
    town?: string;
    hamlet?: string;
    suburb?: string;
    neighbourhood?: string;
    motorway?: string;
    trunk?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
    unclassified?: string;
    residential?: string;
    service?: string;
    footway?: string;
    cycleway?: string;
    path?: string;
    track?: string;
    pedestrian?: string;
    living_street?: string;
    construction?: string;
}

export interface ILocation {
    latLng: LatLngLiteral;
    informations: ILocationInformations;
    position: number;
}

export interface IMapProps {
    location: ILocation;
    zoom: number;
}
