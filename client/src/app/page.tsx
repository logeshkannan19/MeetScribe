'use client';

import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/components/DashboardShell'; // We'll create this next

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Dashboard /> : <LandingPage />;
}
