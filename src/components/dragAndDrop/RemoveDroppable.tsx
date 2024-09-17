import { useDroppable } from "@dnd-kit/core";
import { RiDeleteBin2Line } from "react-icons/ri";

export default function RemoveDroppable() {
    const { setNodeRef, isOver } = useDroppable({
        id: "remove-droppable",
    });

    console.log(isOver);
    return (
        <div ref={setNodeRef}>
            <div
                className={`w-full flex justify-center py-5 ${isOver ? "bg-red-300" : "bg-white"}`}
            >
                <RiDeleteBin2Line
                    color="red"
                    className={isOver ? "animate-ping" : ""}
                    size={isOver ? 50 : 30}
                />
            </div>
        </div>
    );
}
