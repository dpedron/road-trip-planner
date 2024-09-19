import React from "react";
import { useDraggable } from "@dnd-kit/core";
import LocationBadge from "../LocationBadge";
import { administrativeDivision, roadType } from "@/utils/utils";
import { ILocation } from "@/interfaces/locationInterfaces";

export default function DraggableLocation({
    collapsed,
    location,
    isDragging,
}: {
    collapsed: boolean;
    location: ILocation;
    isDragging: number;
}) {
    const { positionOnMap, address } = location;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${positionOnMap}`,
        data: { position: positionOnMap },
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <button
            ref={setNodeRef}
            style={style}
            {...(!collapsed ? listeners : {})}
            {...attributes}
            className="w-full flex justify-center"
        >
            <div className="group">
                <p
                    className={`flex justify-center items-center rounded-full text-gray-500
                                                        ${isDragging && !collapsed ? "group-active:bg-blue-500 group-active:text-white" : ""}
                                                        ${!isDragging && !collapsed ? "group-hover:bg-blue-500/10" : ""}`}
                >
                    <LocationBadge>{positionOnMap.toString()}</LocationBadge>
                    {`${!collapsed ? ` ${roadType(address)} - ${administrativeDivision(address)} - ${address.postcode}` : ""}`}
                </p>
            </div>
        </button>
    );
}
