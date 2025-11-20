import { IComment } from "@/app/interfaces/comments";

export function getSumExpenses(expenses: IComment[]) {    
    return expenses.reduce((prevExpense, expense) => {
            return prevExpense + expense.sum;
    }, 0);
}

export function getSumIncomes( incomes: IComment[]) {
    return incomes.reduce((prevIncome, income) => {
            return prevIncome + income.sum;
    }, 0);
}