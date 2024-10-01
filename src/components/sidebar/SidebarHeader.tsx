"use client";

import { useItinerariesStore } from "@/stores/itinerariesStore";
import { getItinerarySummaryInformations } from "@/utils/itineraryUtils";
import { Dispatch, SetStateAction, useState } from "react";
import { FaCircleChevronDown, FaCircleChevronLeft } from "react-icons/fa6";
import Divider from "../Divider";

interface ISidebarHeaderProps {
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarHeader({
    isSidebarCollapsed,
    setIsSidebarCollapsed,
}: ISidebarHeaderProps) {
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const { itineraries } = useItinerariesStore((state) => state);
    const { totalDistance, totalDuration, totalConsumption } =
        getItinerarySummaryInformations(itineraries);
    return (
        <>
            <div className="m-2 flex items-center">
                <FaCircleChevronLeft
                    className={`cursor-pointer transition-transform ${isSidebarCollapsed ? "rotate-0" : "rotate-180"}`}
                    size={25}
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
                {!isSidebarCollapsed && (
                    <p className="w-full text-center text-xl">
                        🌍 My Road Trip 🌍
                    </p>
                )}
            </div>
            {!isSidebarCollapsed ? (
                <>
                    <Divider />
                    <div className="!m-0 flex bg-green-200 p-2">
                        <p className="mr-2 w-full text-center">
                            Journey summary
                        </p>
                        <FaCircleChevronDown
                            className={`transition-transform ${isSummaryOpen ? "rotate-0" : "rotate-180"}`}
                            size={25}
                            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                        />
                    </div>
                    {isSummaryOpen ? (
                        <div className="!m-0 bg-green-100 p-2">
                            <p>Total distance: {totalDistance}</p>
                            <p>Total duration: {totalDuration}</p>
                            <p>Total consumption: {totalConsumption}</p>
                        </div>
                    ) : null}
                    <Divider />
                </>
            ) : null}
        </>
    );
}
