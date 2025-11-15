export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); 
}

export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const day = date.getDate().toString().padStart(2, '0');     
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}
