export interface ILocationAdress {
    road: string;
    city?: string;
    village?: string;
    town?: string;
    hamlet?: string;
    suburb?: string;
    neighbourhood?: string;
    motorway?: string;
    trunk?: string;
    primary?: string;
    secondary?: string;
    tertiary?: string;
    unclassified?: string;
    residential?: string;
    service?: string;
    footway?: string;
    cycleway?: string;
    path?: string;
    track?: string;
    pedestrian?: string;
    living_street?: string;
    construction?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    region?: string;
    state?: string;
}

export interface ILocation {
    address: ILocationAdress;
    positionOnMap: number;
    lat: number;
    lon: number;
    place_id?: number;
    licence?: string;
    osm_type?: string;
    osm_id?: number;
    class?: string;
    type?: string;
    place_rank?: number;
    importance?: number;
    addresstype?: string;
    name?: string;
    display_name?: string;
    boundingbox?: string[];
}
