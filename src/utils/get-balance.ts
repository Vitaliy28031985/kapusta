import { IComment } from "@/app/interfaces/comments";

export function getBalance(expenses: IComment[], incomes: IComment[]) {
 

    const sumIncomes = incomes.reduce((prevIncome, income) => {
            return prevIncome + income.sum;
    }, 0);
    
    const sumExpenses = expenses.reduce((prevExpense, expense) => {
            return prevExpense + expense.sum;
    }, 0);
        
    return sumIncomes - sumExpenses;

}