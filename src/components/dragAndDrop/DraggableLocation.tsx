import { ILocation } from "@/interfaces/locationInterfaces";
import { administrativeDivision, roadType } from "@/utils/locationUtils";
import { useDraggable } from "@dnd-kit/core";
import LocationBadge from "../LocationBadge";

export default function DraggableLocation({
    isSidebarCollapsed,
    location,
    isDragging,
}: {
    isSidebarCollapsed: boolean;
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
            {...(!isSidebarCollapsed ? listeners : {})}
            {...attributes}
            className="flex w-full justify-center"
        >
            <div className="group w-full">
                <div
                    className={`flex items-center justify-center py-2 pr-2 ${isDragging && !isSidebarCollapsed ? "group-active:bg-blue-500 group-active:text-white" : ""} ${!isDragging && !isSidebarCollapsed ? "group-hover:bg-blue-500/10" : ""}`}
                >
                    <LocationBadge>{positionOnMap.toString()}</LocationBadge>
                    {!isSidebarCollapsed ? (
                        <p className="mx-auto text-sm">
                            {roadType(address)}
                            <br />
                            {administrativeDivision(address)}
                            <br />
                            {address.postcode}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </button>
    );
}
