import type { Expense } from "../types/expense";

type ExpenseListProps = {
    expenses: Expense[];
    onDeleteExpense: (expenseId: string) => void;
    onEditExpense: (expense: Expense) => void;
};

export function ExpenseList({ expenses, onDeleteExpense, onEditExpense }: ExpenseListProps) {
    if (expenses.length === 0) {
        return <p className="empty-state">No expenses yet</p>;
    }

    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    function formatCategory(category: string) {
        return category[0].toUpperCase() + category.slice(1).toLowerCase();
    }

    return (
        <section className="expense-list">
            <h2 className="expense-list-title">Expense list</h2>

            {expenses.map((expense) => (
                <div className="expense-card" key={expense.id}>
                    <h3>{expense.title}</h3>
                    <p>Amount: {formatter.format(expense.amount)}</p>
                    <p>Category: {formatCategory(expense.category)}</p>
                    <p>Date: {dateFormatter.format(new Date(expense.date))}</p>
                    <div className="expense-actions">
                        <button className="button button-secondary" onClick={() => onDeleteExpense(expense.id)}>
                            Delete
                        </button>
                        <button className="button button-primary" onClick={() => onEditExpense(expense)}>
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </section>
    );
}