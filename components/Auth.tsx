"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export type User = {
  email: string;
  password: string;
  role: "admin" | "user";
};

/* ======================
   STORAGE
====================== */
function getUsers(): User[] {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

/* ======================
   AUTH ACTIONS
====================== */
export function register(email: string, password: string) {
  const users = getUsers();

  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }

  users.push({
    email,
    password,
    role: users.length === 0 ? "admin" : "user",
  });

  localStorage.setItem("users", JSON.stringify(users));
}

export function login(email: string, password: string) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) throw new Error("Invalid credentials");

  localStorage.setItem("auth", email);
}

export function logout() {
  localStorage.removeItem("auth");
}

/* ======================
   HELPERS
====================== */
export function getCurrentUser(): User | null {
  const email = localStorage.getItem("auth");
  if (!email) return null;

  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

/* ======================
   GUARDS
====================== */
export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();

useEffect(() => {
  const email = localStorage.getItem("auth");
  if (!email) {
    router.replace("/login");
  }
}, [router]);


  return <>{children}</>;
}

export function RequireAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return <>{children}</>;
}
