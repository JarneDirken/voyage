import { Trip } from "./Trip";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    firebaseUid?: string;
    trips?: Trip[];
}