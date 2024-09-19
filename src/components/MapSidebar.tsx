"use client";

import { useLocationsStore } from "@/stores/locationsStore";
import { Sidebar } from "flowbite-react";
import { useState } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import DraggableLocation from "./dragAndDrop/DraggableLocation";
import RearrangeDroppable from "./dragAndDrop/RearrangeDroppable";
import RemoveDroppable from "./dragAndDrop/RemoveDroppable";
import { handleDragEnd } from "@/utils/utils";
export function MapSidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const [isDragging, setIsDragging] = useState(0);
    const locations = useLocationsStore((state) => state.locations);
    const removeLocation = useLocationsStore((state) => state.removeLocation);
    const rearrangeLocation = useLocationsStore(
        (state) => state.rearrangeLocation
    );
    const sensors = useSensors(useSensor(PointerSensor));

    return (
        <DndContext
            sensors={sensors}
            onDragStart={({ active }) => {
                active.data.current &&
                    setIsDragging(active.data.current.position);
            }}
            onDragEnd={(event) =>
                handleDragEnd(
                    event,
                    removeLocation,
                    rearrangeLocation,
                    setIsDragging
                )
            }
        >
            <div
                onMouseEnter={() => {
                    setCollapsed(false);
                }}
                onMouseLeave={() => {
                    setCollapsed(true);
                }}
                className="absolute top-0 right-0 h-full w-fit z-[10000]"
            >
                <Sidebar
                    collapsed={collapsed}
                    className={`${!collapsed ? "[&>:first-child]:px-0 [&>:first-child]:pt-0" : ""}`}
                >
                    <Sidebar.Items>
                        {!collapsed ? <RemoveDroppable /> : <></>}
                        <Sidebar.ItemGroup>
                            {locations.map((location) => {
                                const { lat, lon, positionOnMap } = location;
                                return (
                                    <div key={`${lat}-${lon}-${positionOnMap}`}>
                                        <RearrangeDroppable
                                            position={positionOnMap}
                                            isDragging={isDragging}
                                        >
                                            <DraggableLocation
                                                collapsed={collapsed}
                                                location={location}
                                                isDragging={isDragging}
                                            />
                                        </RearrangeDroppable>
                                    </div>
                                );
                            })}
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </DndContext>
    );
}
