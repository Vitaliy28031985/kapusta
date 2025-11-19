import { Data } from "../interfaces/filter";

export async function getIncomesData(id: string, filter: Data) {
  const response = await fetch("/api/incomes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, filter }),
  });

  return await response.json();
}
