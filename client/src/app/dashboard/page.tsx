import DashboardShell from '@/components/DashboardShell';
import MeetingDashboard from '@/components/MeetingDashboard'; // We'll create this next

export default function DashboardPage() {
  return (
    <DashboardShell>
      <MeetingDashboard />
    </DashboardShell>
  );
}
