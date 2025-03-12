export interface UpdateTripDto {
    id: number;
    name?: string | null;
    location?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    budget?: number | null;
    isPublic?: boolean | null;
    userUid: string;
}