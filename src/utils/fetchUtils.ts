import { IItinerary, IItineraryStep } from "@/interfaces/itineraryInterface";
import { ILocation } from "@/interfaces/locationInterfaces";
import { LatLngLiteral } from "leaflet";

const NOMINATIM_URL = process.env.NEXT_PUBLIC_NOMINATIM_URL;
const OSRM_URL = process.env.NEXT_PUBLIC_OSRM_URL;

const apiFetch = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T | null> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Fetch Error: ${error}`);
        return null;
    }
};

export const fetchLocationByLatLng = async (
    location: LatLngLiteral
): Promise<ILocation | null> => {
    const url = `${NOMINATIM_URL}/reverse?format=json&lat=${location.lat}&lon=${location.lng}`;
    return apiFetch<ILocation>(url);
};

export const fetchLocationsBySearch = async (
    searchValue: string
): Promise<ILocation[] | null> => {
    const encodedSearchValue = encodeURIComponent(searchValue);
    const url = `${NOMINATIM_URL}/search?format=json&addressdetails&q=${encodedSearchValue}`;
    return apiFetch<ILocation[]>(url);
};

export const fetchItineraryBetweenTwoLocations = async (
    locationOne: { lon: number; lat: number },
    locationTwo: { lon: number; lat: number }
): Promise<IItinerary | null> => {
    const url = `${OSRM_URL}/route/v1/driving/${locationOne.lon},${locationOne.lat};${locationTwo.lon},${locationTwo.lat}?alternatives=true&steps=true&annotations=true`;

    const itinerary = await apiFetch<IItinerary>(url);
    if (itinerary && itinerary.routes.length > 0) {
        const instructions = await fetchInstructions(
            itinerary.routes[0].legs[0].steps
        );
        return { ...itinerary, instructions };
    }

    return itinerary;
};

const fetchInstructions = async (steps: IItineraryStep[]) => {
    const response = await fetch("/api/get-itinerary-instructions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ steps }),
    });

    if (!response.ok) {
        console.error("Error fetching instructions");
        return null;
    }

    const data = await response.json();
    return data.instructions;
};

export const fetchItineraries = async (
    locations: ILocation[],
    itineraries: { [key: string]: IItinerary },
    addItinerary: (key: string, newItinerary: IItinerary) => void
) => {
    const itineraryPromises = locations
        .slice(1)
        .map(async (locationTwo, index) => {
            const locationOne = locations[index];
            const key = `${locationOne.positionOnMap}-${locationTwo.positionOnMap}`;
            const itinerary = await fetchItineraryBetweenTwoLocations(
                locationOne,
                locationTwo
            );
            return itinerary && addItinerary(key, itinerary);
        });

    await Promise.all(itineraryPromises);
};
