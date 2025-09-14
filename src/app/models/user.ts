export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role:"student" | "instructor" | "admin";
    phonenumber: string;
    city: string;
    isApproved?: boolean;
}
