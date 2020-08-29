export interface User {
    name: string;
    email: string;
    direction: string;
    extraInfo: string;
    password?: string;
    phone: number;
    role: string;
    date?: Date;
    _id?: string;
}
