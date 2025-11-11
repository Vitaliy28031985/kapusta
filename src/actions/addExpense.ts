'use server'

export const addExpense = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
}