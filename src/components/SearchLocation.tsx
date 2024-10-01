"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { ILocation } from "@/interfaces/locationInterfaces";
import { useLocationsStore } from "@/stores/locationsStore";
import { useMapStore } from "@/stores/mapStore";
import { fetchLocationsBySearch } from "@/utils/fetchUtils";
import { ListGroup, ListGroupItem, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoIosPin } from "react-icons/io";
import { useDebouncedCallback } from "use-debounce";

export default function SearchLocation() {
    const [inputLocationValues, setInputLocationValues] = useState<
        ILocation[] | null
    >(null);
    const [isFocused, setIsFocused] = useState(false);
    const locations = useLocationsStore((state) => state.locations);
    const addLocation = useLocationsStore((state) => state.addLocation);
    const map = useMapStore((state) => state.map);
    const ref = useOutsideClick(() => {
        setIsFocused(false);
    });

    const handleSearch = useDebouncedCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const searchValue = event.target.value;
            if (searchValue.length > 3) {
                const results = await fetchLocationsBySearch(searchValue);
                return setInputLocationValues(results);
            }
            return setInputLocationValues(null);
        },
        300
    );

    return (
        <div
            className="absolute left-1/2 top-3 z-[10000] -translate-x-1/2 transform"
            onFocus={() => setIsFocused(true)}
            ref={ref}
        >
            <TextInput
                name="search-location"
                id="search-location-input"
                onChange={handleSearch}
                className="w-80"
            />
            {isFocused && inputLocationValues ? (
                <ListGroup className="left-0 mt-1 h-full max-h-80 w-80 overflow-x-hidden overflow-y-scroll">
                    {inputLocationValues.map((location: ILocation) => {
                        const { lat, lon, address, positionOnMap } = location;
                        return (
                            <ListGroupItem
                                key={`${lat}-${lon}-${positionOnMap}`}
                                className="overflow-clip"
                                onClick={() => map?.setView([lat, lon], 13)}
                            >
                                {location.display_name}
                                <IoIosPin
                                    className="shrink-0"
                                    size={40}
                                    onClick={() =>
                                        addLocation({
                                            lat: lat,
                                            lon: lon,
                                            address: address,
                                            positionOnMap: locations.length + 1,
                                        })
                                    }
                                />
                            </ListGroupItem>
                        );
                    })}
                </ListGroup>
            ) : null}
        </div>
    );
}
