export interface LoginForm {
    user: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    surname: string;
    user: string;
    password: string;
    confirmPassword: string;
    role: string;
    email: string;
    token: string;
}