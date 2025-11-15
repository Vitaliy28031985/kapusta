export async function getExpensesData(id: string) {
    
    const response = await fetch(`/api/expenses?id=${id}`);
            
        const reviews = await response.json();
        return reviews;
    }
