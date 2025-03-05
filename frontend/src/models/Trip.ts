import { Activity } from "./Activity";

export interface Trip {
    id: number;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    isPublic: boolean;
    budget?: number;
    userId: number;
    activities?: Activity[];
}