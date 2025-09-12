import { User } from "./user";

export interface Instructor extends User {
    role: 'instructor';
    isApproved: boolean;       // خاص بالمدرسين فقط
    certificateURL: string;    // رابط الشهادة
}