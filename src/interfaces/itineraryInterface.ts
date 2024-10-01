export interface IItinerary {
    code: string;
    routes: IItineraryRoute[];
    waypoints: IItineraryWaypoint[];
    instructions: IItineraryInstruction[];
}

export interface IItineraryRoute {
    geometry: string;
    legs: IItineraryLeg[];
    weight_name: string;
    weight: number;
    duration: number;
    distance: number;
}
export interface IItineraryLeg {
    summary: string;
    weight: number;
    duration: number;
    distance: number;
    steps: IItineraryStep[];
}

export interface IItineraryWaypoint {
    hint: string;
    distance: number;
    name: string;
    location: [number, number];
}

export interface IItineraryStep {
    geometry: string;
    maneuver: IItineraryManeuver;
    mode: string;
    driving_side: string;
    name: string;
    intersections: IItineraryIntersection[];
    weight: number;
    duration: number;
    distance: number;
    ref?: string;
    destinations?: string;
}

export interface IItineraryManeuver {
    bearing_after: number;
    bearing_before: number;
    location: [number, number];
    type: ItineraryManeuverType;
    modifier?: string;
    exit?: number;
}
export type ItineraryManeuverType =
    | "depart"
    | "turn"
    | "roundabout"
    | "exit roundabout"
    | "arrive";

export interface IItineraryIntersection {
    out: number;
    in?: number;
    entry: boolean[];
    bearings: number[];
    location: [number, number];
    lanes?: IItineraryLane[];
}

export interface IItineraryLane {
    valid: boolean;
    indications: string[];
}

export interface IItineraryInstruction {
    direction: string;
    distance: number;
}
