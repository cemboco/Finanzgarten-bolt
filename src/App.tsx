import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { BudgetDistribution } from './components/BudgetDistribution';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { ProfilePage } from './components/ProfilePage';
import { Transaction, Profile } from './types/finance';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [profile, setProfile] = useState<Profile>({
    currentBalance: 5000,
    monthlyIncome: 3500,
    budgetDistribution: {
      fixed: 1750,
      needs: 1050,
      wants: 350,
      savings: 350,
    },
    categories: [],
    savingsGoals: [],
  });

  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    };

    setTransactions([transaction, ...transactions]);
    
    setProfile(prev => ({
      ...prev,
      currentBalance: prev.currentBalance + (
        transaction.type === 'income' ? transaction.amount : -transaction.amount
      ),
    }));
  };

  const handleDeleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      setProfile(prev => ({
        ...prev,
        currentBalance: prev.currentBalance - (
          transaction.type === 'income' ? transaction.amount : -transaction.amount
        ),
      }));
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const handleUpdateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates,
    }));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto"
          >
            <Dashboard profile={profile} transactions={transactions} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              <div className="space-y-8">
                <TransactionForm onSubmit={handleTransaction} />
                <BudgetDistribution profile={profile} />
              </div>
              <TransactionList 
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-7xl mx-auto"
          >
            <ProfilePage 
              profile={profile} 
              transactions={transactions}
              onUpdateProfile={handleUpdateProfile}
            />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <Header 
        onViewChange={setCurrentView} 
        currentView={currentView} 
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {renderCurrentView()}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
