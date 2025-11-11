'use server'
   
export const authorization = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    if (!data.userName) {
        const newData = {
            email: data.email,
            password: data.password
        }

        console.log('login', newData);
    } else {
        const newData = {
            userName: data.userName,
            email: data.email,
            password: data.password
        }

        console.log('Register', newData);
    }

    
    return data;
}