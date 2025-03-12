import { GetActivitiesDto } from "../activity/GetActivitiesDto";

export interface GetTripDetailsDto {
    id: number;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    isPublic: boolean;
    budget?: number;
    imageUrl?: string;
    userUid: string;
    activities?: GetActivitiesDto[];
}