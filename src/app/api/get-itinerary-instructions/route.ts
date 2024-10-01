import { NextResponse } from "next/server";

const version = "v5";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const osrmTextInstructions = require("osrm-text-instructions")(version);

// TODO REFACTO AND IMPROVEMENT AND REMOVE eslint-disable-next-line
export async function POST(req: Request) {
    const { steps } = await req.json();

    if (!steps || !Array.isArray(steps)) {
        return NextResponse.json(
            { error: "Steps are required" },
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
}
