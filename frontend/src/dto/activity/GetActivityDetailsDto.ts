export interface GetActivityDetailsDto {
  id: number;
  name: string;
  description?: string | null;
  startDate: Date;
  endDate: Date;
  cost?: number | null;
  location?: string | null;
}