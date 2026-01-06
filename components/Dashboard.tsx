"use client";

import { Sidebar, Topbar, MobileTopbar } from "./Layout";
import { RevenueChart, UsersChart } from "./Chart";
import { stats, revenueData } from "./data";

type Stat = {
  title: string;
  value: string;
  change: string;
};

function StatCard({ title, value, change }: Stat) {
  const positive = change.startsWith("+");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-slate-800">
      <p className="text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
      <p
        className={`mt-1 text-sm ${
          positive ? "text-emerald-600" : "text-rose-600"
        }`}
      >
        {change} from last month
      </p>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1">
        <MobileTopbar />

        <div className="mx-auto max-w-7xl p-6">
          <Topbar />

          <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </section>

          <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <RevenueChart data={revenueData} />
            <UsersChart />
          </section>
        </div>
      </main>
    </div>
  );
}
