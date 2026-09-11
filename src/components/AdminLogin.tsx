import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
  onBack: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setError('Masukkan PIN admin.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login gagal.');
        setLoading(false);
        return;
      }
      localStorage.setItem('missionary_admin_token', data.token);
      onLoginSuccess(data.token);
    } catch {
      setError('Tidak dapat terhubung ke server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#B5B5B5] hover:text-white text-sm mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </button>

        {/* Card */}
        <div className="bg-[#212121] border border-[#333333] rounded-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/img/missionary-horizontal-white.png"
              alt="Misionary"
              className="h-8 w-auto object-contain opacity-70"
            />
          </div>

          <h2 className="text-white text-lg font-bold text-center mb-1">Portal Pengelola</h2>
          <p className="text-[#888888] text-sm text-center mb-6">
            Masukkan PIN admin untuk mengakses dashboard operasional.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => { setPin(e.target.value); setError(''); }}
                placeholder="PIN Admin"
                className="w-full bg-[#181818] border border-[#444444] text-white text-sm rounded-md pl-10 pr-10 py-3 focus:outline-none focus:border-[#A0844B] transition-colors placeholder-[#666666]"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#999999] cursor-pointer"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A0844B] hover:bg-[#8f743f] disabled:opacity-50 text-white font-semibold text-sm py-3 rounded-md transition-colors cursor-pointer"
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
            </button>
          </form>

          <p className="text-[#555555] text-[11px] text-center mt-5">
            Hanya untuk pengelola Misionary Rental Motor Bandung.
          </p>
        </div>
      </div>
    </div>
  );
};
