import React from 'react';
import { WalletCards, LayoutDashboard, UserCircle } from 'lucide-react';

interface HeaderProps {
  onViewChange: (view: 'dashboard' | 'profile') => void;
  currentView: 'dashboard' | 'profile';
}

export function Header({ onViewChange, currentView }: HeaderProps) {
  return (
    <header className="bg-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WalletCards className="h-8 w-8" />
          <h1 className="text-2xl font-bold">FinanzGarten</h1>
        </div>
        <nav className="flex gap-4">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentView === 'dashboard'
                ? 'bg-white text-indigo-600'
                : 'hover:bg-indigo-500'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => onViewChange('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentView === 'profile'
                ? 'bg-white text-indigo-600'
                : 'hover:bg-indigo-500'
            }`}
          >
            <UserCircle className="h-5 w-5" />
            <span>Profil</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
