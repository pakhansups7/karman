import type { Category } from "./categories";

export type Expense = {
    id: string;
    title: string;
    amount: number;
    category: Category;
    date: string;
};