"use client";

import { useLocationsStore } from "@/stores/locationsStore";
import { ListGroup, ListGroupItem, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { IoIosPin } from "react-icons/io";
import { useMapStore } from "@/stores/mapStore";
import useOutsideClick from "@/hooks/useOutsideClick";
import { fetchLocationsBySearch } from "@/utils/utils";
import { ILocation } from "@/interfaces/locationInterfaces";

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
            className="absolute top-3 left-1/2 transform -translate-x-1/2 z-[10000]"
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
                <ListGroup className="w-80 left-0 mt-1 overflow-y-scroll overflow-x-hidden h-full max-h-80">
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
