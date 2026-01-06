"use client";

import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "./Auth";
import { useState } from "react";
import { ThemeToggle } from "./Theme";

export function Sidebar() {
  return (
    <aside className="hidden w-64 bg-white p-6 shadow-md dark:bg-slate-800 md:block">
      <h1 className="text-2xl font-bold text-indigo-600">ZharDash</h1>

      <nav className="mt-10 space-y-3">
        {["Dashboard", "Analytics", "Settings"].map((item) => (
          <div
            key={item}
            className="cursor-pointer rounded-lg px-4 py-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {item}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export function MobileTopbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow dark:bg-slate-800 md:hidden">
        <button onClick={() => setOpen(true)}>☰</button>
        <span className="font-bold">ZharDash</span>
        <ThemeToggle />
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <aside className="h-full w-64 bg-white p-6 dark:bg-slate-800">
            <button onClick={() => setOpen(false)}>✕</button>

            <nav className="mt-6 space-y-3">
              {["Dashboard", "Analytics", "Settings"].map((item) => (
                <div
                  key={item}
                  className="cursor-pointer rounded-lg px-4 py-2 text-slate-600 hover:bg-indigo-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  {item}
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export function Topbar() {
  const router = useRouter();
  const user = getCurrentUser();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <header className="hidden md:flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="h-10 w-10 rounded-full bg-indigo-600 text-white"
        >
          {user.email[0].toUpperCase()}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white shadow">
            <p className="px-4 py-2 text-sm text-gray-600">
              {user.email}
            </p>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
