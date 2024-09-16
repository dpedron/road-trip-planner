import { useDroppable } from "@dnd-kit/core";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function RemoveDroppable({
    isOverRemoveZone,
}: {
    isOverRemoveZone: boolean;
}) {
    const { setNodeRef } = useDroppable({
        id: "remove-droppable",
    });

    return (
        <div ref={setNodeRef}>
            <div
                className={`w-full flex justify-center py-5 ${isOverRemoveZone ? "bg-red-300" : "bg-white"}`}
            >
                <RiDeleteBin2Line
                    color="red"
                    className={isOverRemoveZone ? "animate-ping" : ""}
                    size={isOverRemoveZone ? 50 : 30}
                />
            </div>
        </div>
    );
}
