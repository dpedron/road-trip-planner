import { NextResponse } from "next/server";
import osrmTextInstructionsModule from "osrm-text-instructions";

const version = "v5";
const osrmTextInstructions = osrmTextInstructionsModule(version);

export async function POST(req: Request) {
    try {
        const { steps } = await req.json();

        if (!steps || !Array.isArray(steps)) {
            return NextResponse.json(
                { error: "Invalid steps format or steps are missing" },
                { status: 400 }
            );
        }

        const instructionsWithDistances = steps.map((step) => {
            const direction = osrmTextInstructions.compile("en", step);
            const distance = step.distance;
            return { direction, distance };
        });

        return NextResponse.json(
            { instructions: instructionsWithDistances },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing request:", error);

        return NextResponse.json(
            { error: "An internal server error occurred" },
            { status: 500 }
        );
    }
}
