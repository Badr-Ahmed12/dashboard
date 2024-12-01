export interface Todo {
  id: string;
  text: string;
  date: string;
  completed: boolean;
}

export interface Transaction {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: 'مكتمل' | 'معلق' | 'ملغي';
}

export interface StatCard {
  title: string;
  icon: string;
  color: string;
  value: string | number;
}