import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { Charts } from './components/Charts';
import { TodoList } from './components/TodoList';
import { TransactionTable } from './components/TransactionTable';
import { NotificationCenter } from './components/NotificationCenter';
import { Todo, Transaction } from './types';

const initialStatData = [
  {
    title: 'إجمالي المستخدمين',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    color: 'bg-blue-500',
    value: 0,
  },
  {
    title: 'الإيرادات',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'bg-green-500',
    value: '$0',
  },
  {
    title: 'معدل النمو',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    color: 'bg-yellow-500',
    value: '0%',
  },
  {
    title: 'الرسائل الجديدة',
    icon: 'M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76',
    color: 'bg-red-500',
    value: 0,
  },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.getItem('darkMode') === 'true'
  );
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(() => 
    JSON.parse(localStorage.getItem('todos') || '[]')
  );
  const [statData, setStatData] = useState(initialStatData);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1234',
      customer: 'أحمد محمد',
      amount: '$100.00',
      date: '2023-06-01',
      status: 'مكتمل',
    },
    // Add more initial transactions here
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
  };

  const updateStatCards = () => {
    setStatData((prev) =>
      prev.map((stat, index) => ({
        ...stat,
        value:
          index === 0
            ? Math.floor(Math.random() * 10000) + 5000
            : index === 1
            ? '$' + (Math.floor(Math.random() * 100000) + 50000)
            : index === 2
            ? (Math.random() * 10).toFixed(2) + '%'
            : Math.floor(Math.random() * 50),
      }))
    );
    addNotification('تم تحديث البطاقات الإحصائية');
  };

  const addNewTransaction = () => {
    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 10000).toString(),
      customer: 'عميل جديد',
      amount: '$' + (Math.random() * 500).toFixed(2),
      date: new Date().toISOString().split('T')[0],
      status: ['مكتمل', 'معلق', 'ملغي'][Math.floor(Math.random() * 3)] as Transaction['status'],
    };
    setTransactions((prev) => [newTransaction, ...prev.slice(0, 9)]);
    addNotification('تمت إضافة معاملة جديدة');
  };

  useEffect(() => {
    const statInterval = setInterval(updateStatCards, 5000);
    const transactionInterval = setInterval(addNewTransaction, 10000);

    return () => {
      clearInterval(statInterval);
      clearInterval(transactionInterval);
    };
  }, []);

  const handleAddTodo = (text: string, date: string) => {
    const newTodo: Todo = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      date,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    addNotification('تمت إضافة مهمة جديدة');
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    addNotification('تم حذف المهمة');
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    addNotification('تم تحديث حالة المهمة');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      <Header
        notificationCount={notifications.length}
        onNotificationClick={() => setIsNotificationCenterOpen(true)}
        onThemeToggle={() => setIsDarkMode((prev) => !prev)}
      />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <Charts isDarkMode={isDarkMode} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <TodoList
            todos={todos}
            onAdd={handleAddTodo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />
          <TransactionTable transactions={transactions} />
        </div>
      </main>

      <NotificationCenter
        notifications={notifications}
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onClear={() => setNotifications([])}
      />
    </div>
  );
}

export default App;