export interface GetActivitiesDto {
    id: number;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    cost?: number;
    location?: string;
  }