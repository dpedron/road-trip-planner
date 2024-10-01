import { DragEndEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction } from "react";

export const handleDragEnd = (
    event: DragEndEvent,
    removeLocation: (position: number) => void,
    rearrangeLocation: (
        locationInitialPosition: number,
        locationNewPosition: number
    ) => void,
    setIsDragging: Dispatch<SetStateAction<number>>
) => {
    const { over, active } = event;
    const overId = over?.id.toString();

    if (overId && overId === "remove-droppable") {
        const position = active.data.current && active.data.current.position;
        removeLocation(position);
    }
    if (overId && overId.includes("rearrange-droppable")) {
        const initialPosition =
            active.data.current && active.data.current.position;
        rearrangeLocation(
            initialPosition,
            parseInt(overId.replace(/\D+/, ""), 10)
        );
        setIsDragging(0);
    }
};
