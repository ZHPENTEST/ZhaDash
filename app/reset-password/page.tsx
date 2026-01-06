"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { useToast } from "../../components/Toast";

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { show } = useToast();

  const strength = getStrength(password);

  const handleReset = async () => {
    if (strength < 3) {
      show("Password too weak");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      show(error.message);
      return;
    }

    show("Password updated. Welcome back!");
    router.replace("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
        <h1 className="mb-4 text-xl font-bold text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          className="mb-3 w-full rounded border px-3 py-2 dark:bg-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Password strength meter */}
        <div className="mb-4">
          <div className="h-2 w-full rounded bg-slate-200">
            <div
              className={`h-2 rounded transition-all ${
                strength <= 1
                  ? "w-1/4 bg-red-500"
                  : strength === 2
                  ? "w-2/4 bg-amber-500"
                  : strength === 3
                  ? "w-3/4 bg-blue-500"
                  : "w-full bg-emerald-500"
              }`}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Password strength
          </p>
        </div>

        <button
          onClick={handleReset}
          className="w-full rounded bg-indigo-600 py-2 text-white transition hover:bg-indigo-700"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
