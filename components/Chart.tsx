"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type RevenuePoint = {
  month: string;
  revenue: number;
};

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold">Revenue</h3>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function UsersChart() {
  const data = [
    { day: "Mon", users: 30 },
    { day: "Tue", users: 45 },
    { day: "Wed", users: 60 },
    { day: "Thu", users: 40 },
    { day: "Fri", users: 80 },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-800">
      <h3 className="mb-4 text-lg font-semibold">New Users</h3>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
