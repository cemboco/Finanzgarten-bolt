import React from 'react';
import { LineChart, PieChart, Target, TrendingUp, Wallet } from 'lucide-react';
import { Profile, Transaction } from '../types/finance';
import { SavingsGoals } from './SavingsGoals';
import { CategoryManager } from './CategoryManager';
import { TransactionFilters } from './TransactionFilters';

interface ProfilePageProps {
  profile: Profile;
  transactions: Transaction[];
}

export function ProfilePage({ profile, transactions }: ProfilePageProps) {
  const calculateSavingsRate = () => {
    const monthlyExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    return ((profile.monthlyIncome - monthlyExpenses) / profile.monthlyIncome * 100).toFixed(1);
  };

  const getSpendingByCategory = () => {
    return transactions
      .filter(t => t.type === 'expense' && t.category)
      .reduce((acc, curr) => {
        const category = curr.category!.type;
        acc[category] = (acc[category] || 0) + curr.amount;
        return acc;
      }, {} as Record<string, number>);
  };

  const getMonthlyTrend = () => {
    const monthlyData: Record<string, { expenses: number; income: number }> = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('de-DE', { month: 'long' });
      if (!monthlyData[month]) {
        monthlyData[month] = { expenses: 0, income: 0 };
      }
      if (t.type === 'expense') {
        monthlyData[month].expenses += t.amount;
      } else {
        monthlyData[month].income += t.amount;
      }
    });

    return monthlyData;
  };

  const handleFilterChange = (filters: {
    dateRange: 'all' | 'week' | 'month' | 'year';
    type: 'all' | 'income' | 'expense';
    category?: string;
  }) => {
    // Implementiere Filter-Logik hier
    console.log('Filter changed:', filters);
  };

  const handleAddSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
    // Implementiere Sparziel-Logik hier
    console.log('New savings goal:', goal);
  };

  const handleAddCategory = (category: Omit<Category, 'id' | 'spent'>) => {
    // Implementiere Kategorie-Logik hier
    console.log('New category:', category);
  };

  const handleUpdateCategory = (id: string, updates: Partial<Category>) => {
    // Implementiere Kategorie-Update-Logik hier
    console.log('Update category:', id, updates);
  };

  const spendingByCategory = getSpendingByCategory();
  const monthlyTrend = getMonthlyTrend();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">Finanzprofil</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Wallet className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-80">Monatliches Einkommen</p>
              <p className="text-2xl font-bold">€{profile.monthlyIncome.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-80">Sparquote</p>
              <p className="text-2xl font-bold">{calculateSavingsRate()}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-80">Aktueller Kontostand</p>
              <p className="text-2xl font-bold">€{profile.currentBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters onFilterChange={handleFilterChange} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Spending Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Ausgabenverteilung</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(spendingByCategory).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{category}</span>
                    <span className="text-sm font-medium">€{amount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{
                        width: `${(amount / Object.values(spendingByCategory).reduce((a, b) => a + b, 0) * 100)}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-2 mb-6">
              <LineChart className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Monatlicher Trend</h2>
            </div>
            <div className="space-y-6">
              {Object.entries(monthlyTrend).map(([month, data]) => (
                <div key={month}>
                  <h3 className="font-medium mb-2">{month}</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Einnahmen</span>
                        <span className="font-medium">€{data.income.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(data.income / Math.max(data.income, data.expenses) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-600">Ausgaben</span>
                        <span className="font-medium">€{data.expenses.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{
                            width: `${(data.expenses / Math.max(data.income, data.expenses) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SavingsGoals
            goals={profile.savingsGoals || []}
            onAddGoal={handleAddSavingsGoal}
          />
          <CategoryManager
            categories={profile.categories || []}
            onAddCategory={handleAddCategory}
            onUpdateCategory={handleUpdateCategory}
          />
        </div>
      </div>
    </div>
  );
}
