import { ILocation } from "@/interfaces/locationInterfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationsState {
    locations: ILocation[];
    addLocation: (newLocation: ILocation) => void;
    removeLocation: (locationPosition: number) => void;
    rearrangeLocation: (
        locationInitialPosition: number,
        locationNewPosition: number
    ) => void;
}

export const useLocationsStore = create<LocationsState>()(
    persist(
        (set) => ({
            locations: [],
            addLocation: (newLocation) =>
                set((state) => ({
                    locations: [...state.locations, newLocation],
                })),
            removeLocation: (locationPosition) =>
                set((state) => {
                    const updatedLocations = state.locations.filter(
                        (location) =>
                            location.positionOnMap !== locationPosition
                    );

                    const resortedPositions = updatedLocations.map(
                        (location, index) => ({
                            ...location,
                            positionOnMap: index + 1,
                        })
                    );

                    return { locations: resortedPositions };
                }),
            rearrangeLocation: (locationInitialPosition, locationNewPosition) =>
                set((state) => {
                    const { locations } = state;

                    const newLocations = [...locations];

                    const initialIndex = newLocations.findIndex(
                        (location) =>
                            location.positionOnMap === locationInitialPosition
                    );

                    if (initialIndex === -1) return state;

                    const [movedLocation] = newLocations.splice(
                        initialIndex,
                        1
                    );

                    newLocations.forEach((location) => {
                        const isMoveUp =
                            location.positionOnMap >= locationNewPosition &&
                            location.positionOnMap < locationInitialPosition;
                        const isMoveDown =
                            location.positionOnMap <= locationNewPosition &&
                            location.positionOnMap > locationInitialPosition;

                        if (isMoveUp || isMoveDown) {
                            location.positionOnMap += isMoveUp ? 1 : -1;
                        }
                    });

                    movedLocation.positionOnMap = locationNewPosition;
                    newLocations.splice(
                        locationNewPosition - 1,
                        0,
                        movedLocation
                    );

                    return { ...state, locations: newLocations };
                }),
        }),
        {
            name: "locations-storage",
        }
    )
);
