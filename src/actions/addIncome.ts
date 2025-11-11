'use server'

export const addIncome = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
}