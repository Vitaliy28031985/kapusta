import { getExpensesData } from '@/app/fetchFunctions/getExpenses';
import { IComment } from '@/app/interfaces/comments';
import { create } from 'zustand';

interface ExpenseState {
    data: IComment[];
    fetchExpenses: (userId: string) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    data: [],
    
    fetchExpenses: async (userId: string) => {
        try {
            const response = await getExpensesData(userId);
            const expenses: IComment[] = response.data?.data || [];
            
            const newExpenses = expenses.map(item => ({
                ...item,
                isActions: false,
                isShow: false,
                isDelete: false
            }));
            
            set({ data: newExpenses });
        } catch (error) {
            console.error("Error fetching expenses:", error);
            set({ data: [] });
        }
    }
}));
