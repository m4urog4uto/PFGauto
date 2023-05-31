import { Course } from "./course.model";

export interface Mentor {
    id: number;
    fullName: string;
}

export interface InscriptionsStudents {
    id: number;
    fullName: string;
    dni: string;
}

export interface Inscription {
    id: number;
    commission: number;
    courseName: string;
    mentors: string[];
    students: string[];
}