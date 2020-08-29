import { User } from './user';

export interface Orders {
    products: Array<any>;
    instructions: string;
    total: number;
    status: string;
    _id?: string;
    date: Date;
    user: User;
}