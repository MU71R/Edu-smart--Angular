import { User } from "./user";
export interface Cours {
    _id: string;
    estimatedDuration: number ;
    lessons: number;
    completed: boolean;
    preview: boolean;
    hoursCompleted: number;
    percentage: number;
    title: string;
    description: string;
    type: 'course' | 'package';
    price: number;
    coverImageURL: string;
    categoryID: string;
    language: string;
    rating: number;
    students: number;
    level: string;
    isFree: boolean;
    originalPrice: number;
    instructorID: User; 
    discount: number;
    createdAt: Date;
}
