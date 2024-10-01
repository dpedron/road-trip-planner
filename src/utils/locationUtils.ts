import { ILocationAdress } from "@/interfaces/locationInterfaces";

export const administrativeDivision = (
    locationAddress: ILocationAdress
): string => {
    try {
        if (!locationAddress || typeof locationAddress !== "object") {
            throw new Error("Invalid location address object.");
        }

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

        return (
            divisionPriority.find(
                (division) => division && typeof division === "string"
            ) || "Unknown location"
        );
    } catch (error) {
        console.error("Failed to determine administrative division:", error);
        return "Unknown location";
    }
};

export const roadType = (locationAddress: ILocationAdress): string => {
    try {
        if (!locationAddress || typeof locationAddress !== "object") {
            throw new Error("Invalid location address object.");
        }

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

        return (
            roadPriority.find((road) => road && typeof road === "string") ||
            "Unknown road"
        );
    } catch (error) {
        console.error("Failed to determine road type:", error);
        return "Unknown road";
    }
};
