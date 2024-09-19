import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function RearrangeDroppable({
    children,
    position,
    isDragging,
}: {
    children: ReactNode;
    position: number;
    isDragging: number;
}) {
    const { setNodeRef, isOver } = useDroppable({
        id: `rearrange-droppable-${position}`,
    });

    const rearrangeToTheTop =
        isOver && isDragging !== position && position < isDragging;
    const rearrangeToTheDown =
        isOver && isDragging !== position && position > isDragging;

    const DropZone = () => <div className="h-12 w-full bg-blue-200" />;

    return (
        <div ref={setNodeRef}>
            {rearrangeToTheTop ? <DropZone /> : null}
            {children}
            {rearrangeToTheDown ? <DropZone /> : null}
        </div>
    );
}
