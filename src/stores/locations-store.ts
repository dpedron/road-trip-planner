import { create } from "zustand";
import { ILocation } from "@/interfaces/mapInterfaces";

interface LocationsState {
    locations: ILocation[];
    addLocation: (newLocation: ILocation) => void;
    removeLocation: (locationPosition: number) => void;
    rearrangeLocation: (
        locationInitialPosition: number,
        locationNewPosition: number
    ) => void;
}

export const useLocationsStore = create<LocationsState>((set) => ({
    locations: [],
    addLocation: (newLocation) =>
        set((state) => ({
            locations: [...state.locations, newLocation],
        })),
    removeLocation: (locationPosition) =>
        set((state) => {
            const updatedLocations = state.locations.filter(
                (location) => location.position !== locationPosition
            );

            const resortedPositions = updatedLocations.map(
                (location, index) => ({
                    ...location,
                    position: index + 1,
                })
            );

            return { locations: resortedPositions };
        }),
    rearrangeLocation: (locationInitialPosition, locationNewPosition) =>
        set((state) => {
            const { locations } = state;

            const initialIndex = locations.findIndex(
                (location) => location.position === locationInitialPosition
            );

            if (initialIndex === -1) return state;

            const [movedLocation] = locations.splice(initialIndex, 1);

            locations.forEach((location) => {
                if (
                    location.position >= locationNewPosition &&
                    location.position < locationInitialPosition
                ) {
                    location.position += 1;
                } else if (
                    location.position <= locationNewPosition &&
                    location.position > locationInitialPosition
                ) {
                    location.position -= 1;
                }
            });

            movedLocation.position = locationNewPosition;

            locations.splice(locationNewPosition - 1, 0, movedLocation);

            return { ...state, locations };
        }),
}));
