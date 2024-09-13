import { LatLngLiteral } from "leaflet";

export const fetchAddress = async (position: LatLngLiteral) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.lat}&lon=${position.lng}`
    );
    const responses = await response.json();
    return responses.address;
};
