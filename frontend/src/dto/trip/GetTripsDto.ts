export interface GetTripsDto {
    id: number;
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
    isPublic: boolean;
    budget?: number;
    userFirstName: string;
    amountOfActivites: number;
    imageUrl?: string;
  }