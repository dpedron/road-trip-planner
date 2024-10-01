"use client";

import { useItinerariesStore } from "@/stores/itinerariesStore";
import { useLocationsStore } from "@/stores/locationsStore";
import { handleDragEnd } from "@/utils/dragAndDropUtils";
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Sidebar } from "flowbite-react";
import { useState } from "react";
import Divider from "../Divider";
import DraggableLocation from "../dragAndDrop/DraggableLocation";
import RearrangeDroppable from "../dragAndDrop/RearrangeDroppable";
import RemoveDroppable from "../dragAndDrop/RemoveDroppable";
import ItineraryInstructions from "../ItineraryInstructions";
import SidebarHeader from "./SidebarHeader";

export default function MapSidebar() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
    const [isDraggingLocation, setIsDraggingLocation] = useState(0);
    const { locations, removeLocation, rearrangeLocation } = useLocationsStore(
        (state) => state
    );
    const { itineraries } = useItinerariesStore((state) => state);
    const sensors = useSensors(useSensor(PointerSensor));

    return locations.length ? (
        <DndContext
            sensors={sensors}
            onDragStart={({ active }) => {
                active.data.current &&
                    setIsDraggingLocation(active.data.current.position);
            }}
            onDragEnd={(event) =>
                handleDragEnd(
                    event,
                    removeLocation,
                    rearrangeLocation,
                    setIsDraggingLocation
                )
            }
        >
            <div className="absolute right-0 top-0 z-[10000] h-full w-fit">
                <Sidebar
                    collapsed={isSidebarCollapsed}
                    className={`${!isSidebarCollapsed ? "[&>:first-child]:px-0 [&>:first-child]:pt-0" : ""} text-black`}
                >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            {!isSidebarCollapsed && isDraggingLocation ? (
                                <>
                                    <RemoveDroppable />
                                    <Divider />
                                </>
                            ) : null}

                            {!isDraggingLocation ? (
                                <SidebarHeader
                                    isSidebarCollapsed={isSidebarCollapsed}
                                    setIsSidebarCollapsed={
                                        setIsSidebarCollapsed
                                    }
                                />
                            ) : null}

                            {locations.map((location, index) => {
                                const { lat, lon, positionOnMap } = location;
                                const itineraryKey = `${positionOnMap}-${index + 2}`;
                                const displayInstructions =
                                    locations.length > positionOnMap &&
                                    !isSidebarCollapsed &&
                                    !isDraggingLocation;

                                return (
                                    <div
                                        key={`${lat}-${lon}-${positionOnMap}`}
                                        className="!mt-0"
                                    >
                                        <RearrangeDroppable
                                            position={positionOnMap}
                                            isDragging={isDraggingLocation}
                                        >
                                            <DraggableLocation
                                                isSidebarCollapsed={
                                                    isSidebarCollapsed
                                                }
                                                location={location}
                                                isDragging={isDraggingLocation}
                                            />
                                        </RearrangeDroppable>
                                        {displayInstructions ? (
                                            <ItineraryInstructions
                                                itineraries={itineraries}
                                                itineraryKey={itineraryKey}
                                            />
                                        ) : null}
                                    </div>
                                );
                            })}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </DndContext>
    ) : null;
}
