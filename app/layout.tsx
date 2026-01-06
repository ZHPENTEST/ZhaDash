import "./globals.css";
import { ToastProvider } from "../components/Toast";
import { AuthProvider } from "../components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100 antialiased">
        <AuthProvider><ToastProvider>{children}</ToastProvider></AuthProvider>
      </body>
    </html>
  );
}
