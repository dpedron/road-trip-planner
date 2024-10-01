import { IItinerary } from "@/interfaces/itineraryInterface";
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

export const getItinerarySummaryInformations = (itineraries: {
    [key: string]: IItinerary;
}) => {
    let totalDistance = 0;
    let totalDuration = 0;

    Object.values(itineraries).map((itinerary) => {
        totalDistance += itinerary.routes[0].distance;
        totalDuration += itinerary.routes[0].duration;
    });

    return {
        totalDistance: formatDistanceFromMeters(totalDistance),
        totalDuration: formatTimeFromSeconds(totalDuration),
        totalConsumption: fuelNeededFromMeters(totalDistance),
    };
};

function formatTimeFromSeconds(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedTime = [
        hrs > 0 ? `${hrs}h` : null,
        mins > 0 ? `${mins}m` : null,
        `${secs.toFixed(0)}s`,
    ]
        .filter(Boolean)
        .join(" ");

    return formattedTime;
}

function formatDistanceFromMeters(distance: number) {
    const distanceInKilometers = distance / 1000;

    const km = Math.floor(distanceInKilometers);
    const remainingMeters = (distanceInKilometers - km) * 1000;

    const formattedDistance = [
        km > 0 ? `${km}km` : null,
        remainingMeters > 0 ? `${remainingMeters.toFixed(0)}m` : null,
    ]
        .filter(Boolean)
        .join(" ");

    return formattedDistance;
}

function fuelNeededFromMeters(distance: number, userConsumption = 6) {
    return `${((distance / 100000) * userConsumption).toFixed(2)}L`;
}
