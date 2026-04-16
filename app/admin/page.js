import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  // Automatically redirect /admin traffic to the dashboard
  redirect('/admin/dashboard');
}
