"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLogin } from "@/src/components/AdminLogin";
import { AdminDashboard } from "@/src/components/AdminDashboard";

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("missionary_admin_token");
    setToken(savedToken);
    setIsReady(true);
  }, []);

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem("missionary_admin_token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("missionary_admin_token");
    setToken(null);
    router.push("/");
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#0E1017] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#A0844B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (token) {
    return <AdminDashboard token={token} onLogout={handleLogout} />;
  }

  return (
    <AdminLogin
      onLoginSuccess={handleLoginSuccess}
      onBack={() => router.push("/")}
    />
  );
}
