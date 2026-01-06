"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { RequireAdmin } from "../../components/RequireAdmin";
import { useToast } from "../../components/Toast";

type Profile = {
  id: string;
  email: string;
  role: "admin" | "user";
};

export default function AdminPage() {
  const { show } = useToast();
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    supabase.from("profiles").select("*").then(({ data }) => {
      setUsers((data as Profile[]) || []);
    });
  }, []);

  const setRole = async (id: string, role: "admin" | "user") => {
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (error) return show(error.message);
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, role } : x)));
    show("Role updated");
  };

  return (
    <RequireAdmin>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-4 text-2xl font-bold">Admin — Users</h1>
        <div className="rounded bg-white shadow">
          {users.map((u) => (
            <div key={u.id} className="flex items-center justify-between border-b p-3">
              <div>
                <p className="font-medium">{u.email}</p>
                <p className="text-sm text-slate-500">{u.role}</p>
              </div>
              <select
                value={u.role}
                onChange={(e) => setRole(u.id, e.target.value as any)}
                className="rounded border px-2 py-1"
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </RequireAdmin>
  );
}
