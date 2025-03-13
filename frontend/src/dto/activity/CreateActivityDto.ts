export interface CreateActivityDto {
  name: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  cost?: number | null;
  location?: string | null;
  tripId: number;
  userUid: string;
}