interface DataItem {
  label: string;
  value: number;
}

export interface GraphsProps {
  data: DataItem[];
}


export interface DataCategory {
  id: number;
  name: string;
  icon: string;
  sum: number
}

