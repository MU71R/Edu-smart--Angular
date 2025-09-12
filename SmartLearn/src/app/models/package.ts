import { Cours } from "./cours";
import { User } from "./user";
export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;   // ✅ نفس اللي في الـ backend
  coverImageURL: string;
  estimatedDuration: number;
  progress: number;
  rating: number;
  instructorID: User;
  level: string;
  hoursCompleted: number;
  coursesCompleted: number;
  percentage: number;
  totalHours: number;
  package: Cours[];   
  keySkills: string[];
  students: User[];
  careerPaths: string[];
  isFree: boolean;              // يتحسب في الـ frontend (price === 0)
  originalPrice: number;        // يتحسب من مجموع أسعار الكورسات
  createdAt: string;
  updatedAt: string;
}


