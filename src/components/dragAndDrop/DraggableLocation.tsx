import React from "react";
import { useDraggable } from "@dnd-kit/core";
import LocationBadge from "../LocationBadge";
import { administrativeDivision, roadType } from "@/utils/utils";
import { ILocation } from "@/interfaces/mapInterfaces";

export default function DraggableLocation({
    collapsed,
    location,
    isDragging,
}: {
    collapsed: boolean;
    location: ILocation;
    isDragging: number;
}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `draggable-${location.position}`,
        data: { position: location.position },
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
                    <LocationBadge>
                        {location.position.toString()}
                    </LocationBadge>
                    {`${!collapsed ? ` ${roadType(location.informations)} - ${administrativeDivision(location.informations)} - ${location.informations.postcode}` : ""}`}
                </p>
            </div>
        </button>
    );
}
