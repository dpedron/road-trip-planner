"use client";

import { useLocationsStore } from "@/stores/locations-store";
import { administrativeDivision, roadType } from "@/utils/utils";
import { Sidebar } from "flowbite-react";
import { useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";
import { RiDeleteBin2Line } from "react-icons/ri";
import LocationBadge from "./LocationBadge";
export function MapSidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const locations = useLocationsStore((state) => state.locations);
    const removeLocation = useLocationsStore((state) => state.removeLocation);

    return (
        <Sidebar collapsed={collapsed}>
            <button className="p-2" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? (
                    <HiChevronLeft size={24} className="text-gray-500" />
                ) : (
                    <div className="flex">
                        <HiChevronRight size={24} className="text-gray-500" />
                        <p className="text-gray-800">Mon itinéraire</p>
                    </div>
                )}
            </button>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {locations.map((location) => {
                        const { postcode, country } = location.informations;
                        return (
                            <div
                                key={`${country}-${location.position}`}
                                className="group relative"
                            >
                                {!collapsed && (
                                    <div className="absolute group-hover:bg-blue-500/10 rounded-l-full w-full h-full">
                                        <div className="absolute bg-white top-0 right-0 h-full flex items-center w-0 group-hover:w-fit">
                                            <RiDeleteBin2Line
                                                color="red"
                                                className="cursor-pointer"
                                                size={25}
                                                onClick={() =>
                                                    removeLocation(
                                                        location.position
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                                <p
                                    className={`text-gray-500 flex justify-center items-center`}
                                >
                                    <LocationBadge>
                                        {location.position.toString()}
                                    </LocationBadge>
                                    {`${!collapsed ? ` ${roadType(location.informations)} - ${administrativeDivision(location.informations)} - ${postcode}` : ""}`}
                                </p>
                            </div>
                        );
                    })}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
