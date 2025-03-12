export interface CreateTripDto {
    name: string;
    location: string;
    startDate: Date | null;
    endDate: Date | null;
    budget?: number | null;
    userUid: string;
    image?: File | null;
}