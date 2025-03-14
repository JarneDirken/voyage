export interface UpdateActivityDto {
    id: number;
    name?: string | null;
    location?: string | null;
    startDate?: Date | null;
    endDate?: Date | null;
    cost?: number | null;
    description?: string | null;
    userUid: string;
}