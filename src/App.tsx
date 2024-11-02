import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { BudgetDistribution } from './components/BudgetDistribution';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { ProfilePage } from './components/ProfilePage';
import { Transaction, Profile } from './types/finance';

function App() {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onViewChange={setCurrentView} currentView={currentView} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' ? (
          <>
            <Dashboard profile={profile} transactions={transactions} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <TransactionForm onSubmit={handleTransaction} />
                <BudgetDistribution profile={profile} />
              </div>
              <TransactionList 
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </>
        ) : (
          <ProfilePage 
            profile={profile} 
            transactions={transactions}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>
    </div>
  );
}

export default App;
