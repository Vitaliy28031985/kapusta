import { getExpensesData } from '@/app/fetchFunctions/getExpenses';
import { IComment } from '@/app/interfaces/comments';
import { create } from 'zustand';

interface ExpenseState {
    data: IComment[];
    fetchExpenses: (userId: string) => Promise<void>;

     addIsToggle: (
        id: string,
        currentIsShow: boolean,
        name: 'update' | 'delete'
    ) => void;

    updateField: (id: string, name: string, value: any) => void;

    addLocalExpense: (exp: IComment) => void;
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
    },

     addIsToggle: (id, currentIsShow, name) =>
        set((state) => ({
            data: state.data.map(item =>
                item._id === id
                    ? {
                        ...item,
                        [name === 'update' ? 'isShow' : 'isDelete']: currentIsShow
                    }
                    : item
            )
        })),
     
    updateField: (id, name, value) =>
        set((state) => ({
            data: state.data.map(item =>
                item._id === id
                    ? { ...item, [name]: value }
                    : item
            )
        })),

    addLocalExpense: (exp) =>
        set((state) => ({
            data: [
                {
                    ...exp,
                    isActions: false,
                    isShow: false,
                    isDelete: false
                },
                ...state.data
            ]
        }))

}));
