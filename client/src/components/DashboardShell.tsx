'use client';

import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Zap, 
  Plus, 
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardShell({ children }: { children?: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-50 fixed inset-y-0 lg:relative"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary-600 p-1.5 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MeetScribe</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 py-2">
              <button className="w-full flex items-center gap-2 bg-primary-600 text-white p-3 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 mb-8">
                <Plus className="w-5 h-5" />
                <span>New Meeting</span>
              </button>

              <nav className="space-y-1">
                {[
                  { name: 'Dashboard', icon: LayoutDashboard, active: true },
                  { name: 'My Notes', icon: FileText, active: false },
                  { name: 'Settings', icon: Settings, active: false },
                ].map((item) => (
                  <button
                    key={item.name}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all ${
                      item.active 
                        ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600' 
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3 p-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  {user.name && user.name[0].toUpperCase()}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-bold truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 p-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="text-slate-500">
                <Menu className="w-6 h-6" />
              </button>
            )}
            <div className="relative group max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search meeting notes..."
                className="w-64 lg:w-96 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800 mx-2 hidden sm:block"></div>
            <button className="hidden sm:flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-4 py-2 rounded-xl text-sm font-bold active:scale-95 transition-all">
              Upgrade to Pro
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-grow overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
