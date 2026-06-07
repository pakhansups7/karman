import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { categories } from "../constants/categories";
import type { Category } from "../types/categories";
import type { Expense } from "../types/expense";

export type ExpenseFormData = {
    title: string;
    amount: string;
    category: Category | '';
    date: string;
};

type ExpenseFormProps = {
    onAddExpense: (formData: ExpenseFormData) => void;
    onUpdateExpense: (expenseId: string, formData: ExpenseFormData) => void;
    onCancelEdit: () => void;
    editingExpense: Expense | null;
};

const emptyFormData: ExpenseFormData = {
    title: '',
    amount: '',
    category: '',
    date: '',
};

export function ExpenseForm ({ onAddExpense, onUpdateExpense, onCancelEdit, editingExpense }: ExpenseFormProps) {
    const [formData, setFormData] = useState<ExpenseFormData>(emptyFormData);

    useEffect(() => {
        if (editingExpense === null) {
            return;
        }
        setFormData({
            title: editingExpense.title,
            amount: String(editingExpense.amount),
            category: editingExpense.category,
            date: editingExpense.date,
        });
    }, [editingExpense]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (
            formData.title.trim() === '' ||
            Number(formData.amount) <= 0 ||
            formData.category.trim() === '' ||
            formData.date.trim() === ''
        ) {
            return;
        }

        if (editingExpense) {
            onUpdateExpense(editingExpense.id, formData);
        } else {
            onAddExpense(formData);
        }

        setFormData(emptyFormData);
    }

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;

        setFormData((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }

    function handleCancelEdit() {
        onCancelEdit();
        setFormData(emptyFormData);
    }

    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input
                className="form-field"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
            />

            <input
                className="form-field"
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
            />

            <select
                className="form-field"
                name="category"
                value={formData.category}
                onChange={handleChange}
            >
                <option value="" disabled>
                    Select category
                </option>

                {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                        {category.label}
                    </option>
                ))}
            </select>

            <input
                className="form-field"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Enter date"
            />

            <button className="button button-primary" type="submit">
                {editingExpense ? 'Save Expense' : 'Add Expense'}
            </button>
            {editingExpense && (
                <button className="button button-secondary" type="button" onClick={handleCancelEdit}>
                    Cancel
                </button>
            )}
        </form>
    );
}

// if (name === 'amount') {
//     setFormData((prevForm) => ({
//         ...prevForm,
//         [name]: Number(value),
//     }));
// } else {
//     setFormData((prevForm) => ({
//         ...prevForm,
//         [name]: value,
//     }));
// }