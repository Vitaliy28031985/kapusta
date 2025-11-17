export async function getIncomesData(id: string) {
    
    const response = await fetch(`/api/incomes?id=${id}`);
            
        const reviews = await response.json();
        return reviews;
    }
