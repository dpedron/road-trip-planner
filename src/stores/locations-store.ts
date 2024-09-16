import { create } from "zustand";
import { ILocation } from "@/interfaces/mapInterfaces";

interface LocationsState {
    locations: ILocation[];
    addLocation: (newLocation: ILocation) => void;
    removeLocation: (locationId: number) => void;
}

export const useLocationsStore = create<LocationsState>((set) => ({
    locations: [],
    addLocation: (newLocation) =>
        set((state) => ({
            locations: [...state.locations, newLocation],
        })),
    removeLocation: (locationId) =>
        set((state) => {
            const updatedLocations = state.locations.filter(
                (location) => location.position !== locationId
            );

            const resortedPositions = updatedLocations.map(
                (location, index) => ({
                    ...location,
                    position: index + 1,
                })
            );

            return { locations: resortedPositions };
        }),
}));
