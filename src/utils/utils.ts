import { ILocationInformations } from "@/interfaces/mapInterfaces";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";
import { LatLngLiteral } from "leaflet";
import { Dispatch, SetStateAction } from "react";

export const fetchAddress = async (location: LatLngLiteral) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`
    );
    const responses = await response.json();
    return responses.address;
};

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

export const roadType = (locationInformations: ILocationInformations) => {
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
    } = locationInformations;

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
    setIsDragging: Dispatch<SetStateAction<number>>,
    setIsOverRemoveZone: Dispatch<SetStateAction<boolean>>
) => {
    const { over, active } = event;
    if (over && over.id === "remove-droppable") {
        const position = active.data.current && active.data.current.position;
        removeLocation(position);
    }
    setIsDragging(0);
    setIsOverRemoveZone(false);
};

export const handleDragOver = (
    event: DragOverEvent,
    setIsOverRemoveZone: Dispatch<SetStateAction<boolean>>
) => {
    const { over } = event;
    if (over && over.id === "remove-droppable") {
        setIsOverRemoveZone(true);
    } else {
        setIsOverRemoveZone(false);
    }
};
