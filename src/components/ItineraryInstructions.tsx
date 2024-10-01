"use client";

import { IItinerary } from "@/interfaces/itineraryInterface";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { FaCircleChevronDown } from "react-icons/fa6";
import Divider from "./Divider";
import LocationBadge from "./LocationBadge";

interface ItineraryInstructionsProps {
    itineraries: { [key: string]: IItinerary };
    itineraryKey: string;
}

export default function ItineraryInstructions({
    itineraries,
    itineraryKey,
}: ItineraryInstructionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const itineraryPoints = itineraryKey.split("-");
    const { instructions = [] } = itineraries[itineraryKey] || {};

    return (
        <div className="flex flex-col bg-neutral-100">
            <Divider />
            <div className="flex p-2">
                <p className="mx-auto flex">
                    Itinerary
                    <LocationBadge>{itineraryPoints[0]}</LocationBadge>
                    to
                    <LocationBadge>{itineraryPoints[1]}</LocationBadge>
                </p>
                <button
                    aria-expanded={isOpen}
                    aria-label="Toggle itinerary details"
                    onClick={() => setIsOpen(!isOpen)}
                    className="self-end"
                >
                    <FaCircleChevronDown
                        className={`transition-transform ${isOpen ? "rotate-0" : "rotate-180"}`}
                        size={25}
                    />
                </button>
            </div>
            <div
                className={`transition-max-height flex flex-col overflow-x-hidden overflow-y-scroll duration-300 ${isOpen ? "max-h-60" : "max-h-0"} ${instructions?.length ? "items-start" : "items-center"}`}
            >
                {instructions?.length ? (
                    instructions.map((instruction, index) => (
                        <p key={index} className="px-2">
                            {`${index + 1}) ${instruction.direction} - drive for ${instruction.distance}m`}
                        </p>
                    ))
                ) : (
                    <Spinner
                        color="info"
                        className="my-4 justify-items-center place-self-center self-center"
                    />
                )}
            </div>
            <Divider />
        </div>
    );
}
