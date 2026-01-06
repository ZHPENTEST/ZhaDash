import { supabase } from "./supabase";

/* ======================================================
   AUTH — EMAIL & PASSWORD
====================================================== */

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (error) throw error;

  // Create profile for new user
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        email,
        role: "user",
      });

    if (profileError) throw profileError;
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/* ======================================================
   EMAIL FEATURES
====================================================== */

// 🔁 Resend verification email
export async function resendVerification(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error) throw error;
}

// 🔐 Forgot password (send reset email)
export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
}

/* ======================================================
   OAUTH — GOOGLE
====================================================== */

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
}

/* ======================================================
   ADMIN — USERS MANAGEMENT
====================================================== */

export async function getAllUsers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateUserRole(
  userId: string,
  role: "admin" | "user"
) {
  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", userId);

  if (error) throw error;
}

export async function deleteUser(userId: string) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", userId);

  if (error) throw error;
}
