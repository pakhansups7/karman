import { useEffect, useState } from 'react';
import type { Expense } from './types/expense';
import { ExpenseForm, type ExpenseFormData } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from "./components/ExpenseSummary";
import { CategoryFilter } from "./components/CategoryFilter";
import type { Category } from "./types/categories";
import './App.css'

const EXPENSES_STORAGE_KEY = 'expenses';

function App() {
    const [currentExpenses, setCurrentExpenses] = useState<Expense[]>(() => {
        const expenses = localStorage.getItem(EXPENSES_STORAGE_KEY);

        if (expenses === null) {
            return [];
        }
        try {
            return JSON.parse(expenses);
        } catch {
            return [];
        }
    });
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    useEffect(() => {
        localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(currentExpenses));
    }, [currentExpenses]);

    function handleAddExpense(formData: ExpenseFormData) {
        if (formData.category === '') {
            return;
        }

        const newExpense: Expense = {
            id: crypto.randomUUID(),
            title: formData.title,
            amount: Number(formData.amount),
            category: formData.category,
            date: formData.date,
        };
        setCurrentExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }

    function handleDeleteExpense(expenseId: string) {
        setCurrentExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== expenseId)
        );
    }

    function handleStartEditExpense(expense: Expense) {
        setEditingExpense(expense);
    }

    function handleChangeCategory(category: Category | 'all') {
        setSelectedCategory(category);
    }

    function handleUpdateExpense(expenseId: string, formData: ExpenseFormData) {
        if (formData.category === '') {
            return;
        }

        const category = formData.category;

        setCurrentExpenses((prevExpenses) =>
            prevExpenses.map((expense) => {
                if (expense.id !== expenseId) {
                    return expense;
                }

                return {
                    id: expense.id,
                    title: formData.title,
                    amount: Number(formData.amount),
                    category,
                    date: formData.date,
                };
            })
        );

        setEditingExpense(null);
    }

    function handleCancelEditExpense() {
        setEditingExpense(null)
    }

    const totalAmount = currentExpenses.reduce((acc, cur) => acc + cur.amount, 0);

    const filteredExpenses = currentExpenses.filter((expense) => {
        if (selectedCategory === 'all') {
            return true;
        }
        return expense.category === selectedCategory;
    });

    return (
        <main className="app">
            <h1 className="app-title">Expenses</h1>
            <ExpenseForm
                onAddExpense={handleAddExpense}
                editingExpense={editingExpense}
                onUpdateExpense={handleUpdateExpense}
                onCancelEdit={handleCancelEditExpense}
            />

            <ExpenseSummary totalAmount={totalAmount}/>

            <CategoryFilter
                selectedCategory={selectedCategory}
                onChangeCategory={handleChangeCategory}
            />

            <ExpenseList
                expenses={filteredExpenses}
                onDeleteExpense={handleDeleteExpense}
                onEditExpense={handleStartEditExpense}
            />
        </main>
    );
}

export default App;