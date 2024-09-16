"use client";

import { useLocationsStore } from "@/stores/locations-store";
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
import { handleDragEnd, handleDragOver } from "@/utils/utils";
export function MapSidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const [isDragging, setIsDragging] = useState(0);
    const [isOverRemoveZone, setIsOverRemoveZone] = useState(false);
    const locations = useLocationsStore((state) => state.locations);
    const removeLocation = useLocationsStore((state) => state.removeLocation);
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
                    setIsDragging,
                    setIsOverRemoveZone
                )
            }
            onDragOver={(event) => handleDragOver(event, setIsOverRemoveZone)}
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
                        {!collapsed ? (
                            <RemoveDroppable
                                isOverRemoveZone={isOverRemoveZone}
                            />
                        ) : (
                            <></>
                        )}
                        <RearrangeDroppable>
                            <Sidebar.ItemGroup>
                                {locations.map((location) => {
                                    return (
                                        <DraggableLocation
                                            key={`${location.informations.country}-${location.position}`}
                                            collapsed={collapsed}
                                            location={location}
                                            isDragging={isDragging}
                                        />
                                    );
                                })}
                            </Sidebar.ItemGroup>
                        </RearrangeDroppable>
                    </Sidebar.Items>
                </Sidebar>
            </div>
        </DndContext>
    );
}
