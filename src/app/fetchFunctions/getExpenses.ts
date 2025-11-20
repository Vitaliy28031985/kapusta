import { Data } from "../interfaces/filter";

export async function getExpensesData(id: string, filter: Data) {
    
const response = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, filter }),
  });

  return await response.json();
    }
