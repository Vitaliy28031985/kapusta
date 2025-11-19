import { getIncomesData } from '@/app/fetchFunctions/getIncomes';
import { IComment } from '@/app/interfaces/comments';
import { Data } from '@/app/interfaces/filter';
import { create } from 'zustand';

interface IncomesState {
    data: IComment[];
    fetchIncomes: (userId: string, filter: Data) => Promise<void>;

     addIsToggle: (
        id: string,
        currentIsShow: boolean,
        name: 'update' | 'delete'
    ) => void;

    updateField: (id: string, name: string, value: string) => void;

    addLocalIncome: (exp: IComment) => void;
}

export const useIncomeStore = create<IncomesState>((set) => ({
    data: [],
    
    fetchIncomes: async (userId: string, filter) => {
        try {
            const response = await getIncomesData(userId, filter);
            const incomes: IComment[] = response.data?.data || [];
            
            const newIncomes = incomes.map(item => ({
                ...item,
                isActions: false,
                isShow: false,
                isDelete: false
            }));
            
            set({ data: newIncomes });
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

    addLocalIncome: (exp) =>
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
