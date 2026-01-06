"use client";

import { getCurrentUser } from "../../components/Auth";

export default function SettingsPage() {
  const user = getCurrentUser();

  if (!user) return null;

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <div className="rounded bg-white p-4 shadow">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
