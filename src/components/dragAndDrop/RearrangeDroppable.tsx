import React, { ReactNode } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function RearrangeDroppable({
    children,
    position,
}: {
    children: ReactNode;
    position: number;
}) {
    const { setNodeRef, over } = useDroppable({
        id: `rearrange-droppable-${position}`,
    });

    return (
        <div ref={setNodeRef}>
            {children}
            {over?.id === `rearrange-droppable-${position}` ? (
                <div className="h-12 w-full bg-blue-200" />
            ) : (
                <></>
            )}
        </div>
    );
}
