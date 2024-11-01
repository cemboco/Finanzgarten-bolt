import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, PiggyBank, Target } from 'lucide-react';
import { Transaction, Profile } from '../types/finance';

interface DashboardProps {
  profile: Profile;
  transactions: Transaction[];
}

export function Dashboard({ profile, transactions }: DashboardProps) {
  const getMonthlyAverage = () => {
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const months = new Set(transactions.map(t => t.date.substring(0, 7))).size;
    return months > 0 ? expenses / months : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Aktueller Kontostand</p>
            <p className="text-2xl font-bold text-gray-900">
              €{profile.currentBalance.toFixed(2)}
            </p>
          </div>
          <PiggyBank className="h-8 w-8 text-indigo-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Monatlicher Durchschnitt</p>
            <p className="text-2xl font-bold text-gray-900">
              €{getMonthlyAverage().toFixed(2)}
            </p>
          </div>
          <Target className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Letzte Einnahme</p>
            <p className="text-2xl font-bold text-green-600">
              €{transactions.find(t => t.type === 'income')?.amount.toFixed(2) || '0.00'}
            </p>
          </div>
          <ArrowUpCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Letzte Ausgabe</p>
            <p className="text-2xl font-bold text-red-600">
              €{transactions.find(t => t.type === 'expense')?.amount.toFixed(2) || '0.00'}
            </p>
          </div>
          <ArrowDownCircle className="h-8 w-8 text-red-600" />
        </div>
      </div>
    </div>
  );
}
