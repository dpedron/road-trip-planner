import polyline from "@mapbox/polyline";
import { LatLngTuple } from "leaflet";

export const decodePolyline = (encodedPolyline: string): LatLngTuple[] => {
    try {
        if (!encodedPolyline || typeof encodedPolyline !== "string") {
            throw new Error(
                "Invalid input: Polyline must be a non-empty string."
            );
        }
        return polyline.decode(encodedPolyline).map(([lat, lng]) => [lat, lng]);
    } catch (error) {
        console.error("Failed to decode polyline:", error);
        return [];
    }
};
