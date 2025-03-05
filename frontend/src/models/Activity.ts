export interface Activity {
    id: number;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    cost?: number;
    location?: string;
    tripId: number;
}