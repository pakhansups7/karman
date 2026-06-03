type ExpenseSummaryProps = {
    totalAmount: number;
};

export function ExpenseSummary({ totalAmount }: ExpenseSummaryProps) {
    const formatter = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
    });

    return (
        <p className="expense-summary">
            Total: {formatter.format(totalAmount)}
        </p>
    );
}