import { ILocationInformations } from "@/interfaces/mapInterfaces";
import { LatLngLiteral } from "leaflet";

export const fetchAddress = async (location: LatLngLiteral) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
    );
    const responses = await response.json();
    return responses.address;
};

// NEED TO CHECK IF THERE'S SOMETHING BETTER

export const administrativeDivision = (
    locationInformations: ILocationInformations
) => {
    const { city, town, village, hamlet, suburb, neighbourhood } =
        locationInformations;
    const divisionPriority = [
        city,
        town,
        village,
        suburb,
        neighbourhood,
        hamlet,
    ];

    return divisionPriority.find((division) => division) || "Unknown location";
};

// NEED TO CHECK IF THERE'S SOMETHING BETTER

export const roadType = (locationInformations: ILocationInformations) => {
    const {
        motorway,
        trunk,
        primary,
        secondary,
        tertiary,
        unclassified,
        residential,
        service,
        footway,
        cycleway,
        path,
        track,
        pedestrian,
        living_street,
        construction,
        hamlet,
    } = locationInformations;

    const roadPriority = [
        motorway,
        trunk,
        primary,
        secondary,
        tertiary,
        unclassified,
        residential,
        service,
        footway,
        cycleway,
        path,
        track,
        pedestrian,
        living_street,
        construction,
        hamlet,
    ];

    return roadPriority.find((road) => road) || "Unknown road type";
};
