"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  signIn,
  signUp,
  resendVerification,
  resetPassword,
  signInWithGoogle,
} from "../../lib/auth";
import { useToast } from "../../components/Toast";
import { useAuth } from "../../components/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const needVerify = params.get("verify");

  const { user, loading } = useAuth();
  const { show } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  /* ======================
     Redirect jika sudah login
  ====================== */
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Redirecting…
      </div>
    );
  }

  /* ======================
     HANDLERS
  ====================== */
  const handleLogin = async () => {
    setError("");
    try {
      await signIn(email, password);
      show("Login successful");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    setError("");
    try {
      await signUp(email, password);
      show("Account created. Please verify your email.");
    } catch (err: any) {
      setError(err.message || "Register failed");
    }
  };

  const handleResend = async () => {
    if (!email) {
      show("Please enter your email first");
      return;
    }
    try {
      setSending(true);
      await resendVerification(email);
      show("Verification email resent");
    } catch (err: any) {
      show(err.message || "Failed to resend email");
    } finally {
      setSending(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      show("Please enter your email first");
      return;
    }

    // simple rate-limit (UX guard)
    const last = localStorage.getItem("last_reset");
    if (last && Date.now() - Number(last) < 60_000) {
      show("Please wait 1 minute before retrying");
      return;
    }

    try {
      await resetPassword(email);
      localStorage.setItem("last_reset", Date.now().toString());
      show("Password reset email sent");
    } catch (err: any) {
      show(err.message || "Failed to send reset email");
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow dark:bg-slate-800">
        <h1 className="mb-4 text-2xl font-bold text-center">ZharDash</h1>

        {/* Verify notice */}
        {needVerify && (
          <>
            <p className="mb-2 text-sm text-amber-600 text-center">
              Please verify your email before logging in.
            </p>
            <button
              disabled={sending}
              onClick={handleResend}
              className="mb-4 w-full rounded border py-2 text-sm transition hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-700"
            >
              {sending ? "Sending..." : "Resend verification email"}
            </button>
          </>
        )}

        {/* Error */}
        {error && (
          <p className="mb-3 text-sm text-red-600 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="mb-3 w-full rounded border px-3 py-2 dark:bg-slate-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="mb-2 w-full rounded border px-3 py-2 dark:bg-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Forgot password */}
        <button
          onClick={handleResetPassword}
          className="mb-4 text-sm text-indigo-600 hover:underline"
        >
          Forgot password?
        </button>

        {/* Login */}
        <button
          onClick={handleLogin}
          className="mb-2 w-full rounded bg-indigo-600 py-2 text-white transition hover:bg-indigo-700"
        >
          Login
        </button>

        {/* Register */}
        <button
          onClick={handleRegister}
          className="mb-3 w-full rounded border py-2 transition hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          Create Account
        </button>

        {/* Google OAuth */}
        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
            } catch (e: any) {
              show(e.message || "Google sign-in failed");
            }
          }}
          className="w-full rounded border py-2 transition hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
