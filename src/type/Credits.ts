export type Credits = {
    id:number;
    cast:CastMember[];
    crew: CrewMember[];
}

export type CastMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_departament: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export type CrewMember = {
    adult: boolean;
    gender: number | null;
    id: number;
    known_for_departament: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    departament: string;
    job: string;
}