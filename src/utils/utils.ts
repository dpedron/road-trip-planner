import { ILocation, ILocationAdress } from "@/interfaces/locationInterfaces";
import { DragEndEvent } from "@dnd-kit/core";
import { LatLngLiteral } from "leaflet";
import { Dispatch, SetStateAction } from "react";

export const fetchLocationByLatLng = async (
    location: LatLngLiteral
): Promise<ILocation | null> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
        );
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching address by lat/lng:", error);
        return null;
    }
};

export const fetchLocationsBySearch = async (
    searchValue: string
): Promise<ILocation[]> => {
    try {
        const encodedSearchValue = encodeURIComponent(searchValue);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails&q=${encodedSearchValue}`
        );
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching address by search:", error);
        return [];
    }
};

export const administrativeDivision = (locationAddress: ILocationAdress) => {
    const { city, town, village, hamlet, suburb, neighbourhood } =
        locationAddress;
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

export const roadType = (locationAddress: ILocationAdress) => {
    const {
        road,
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
    } = locationAddress;

    const roadPriority = [
        road,
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

export const handleDragEnd = (
    event: DragEndEvent,
    removeLocation: (position: number) => void,
    rearrangeLocation: (
        locationInitialPosition: number,
        locationNewPosition: number
    ) => void,
    setIsDragging: Dispatch<SetStateAction<number>>
) => {
    const { over, active } = event;
    const overId = over?.id.toString();

    if (overId && overId === "remove-droppable") {
        const position = active.data.current && active.data.current.position;
        removeLocation(position);
    }
    if (overId && overId.includes("rearrange-droppable")) {
        const initialPosition =
            active.data.current && active.data.current.position;
        rearrangeLocation(
            initialPosition,
            parseInt(overId.replace(/\D+/, ""), 10)
        );
        setIsDragging(0);
    }
};
