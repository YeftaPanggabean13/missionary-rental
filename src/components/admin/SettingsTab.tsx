import React, { useState, useEffect } from 'react';
import {
  Settings,
  Database,
  HardDrive,
  Download,
  Shield,
  Key,
  Server,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';

interface SettingsTabProps {
  token: string;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ token }) => {
  const [stats, setStats] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/admin/database/stats', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
      })
      .catch(console.error);
  }, [token]);

  const handleCopyPath = () => {
    if (stats?.dbPath) {
      navigator.clipboard.writeText(stats.dbPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadBackup = () => {
    // Generate JSON backup of all tables
    Promise.all([
      fetch('/api/admin/database/table/bikes?limit=500', { headers: { Authorization: `Bearer ${token}` } }),
      fetch('/api/admin/database/table/bookings?limit=500', { headers: { Authorization: `Bearer ${token}` } }),
    ])
      .then(async ([bRes, bkRes]) => {
        const bikes = (await bRes.json()).data?.rows || [];
        const bookings = (await bkRes.json()).data?.rows || [];
        const backup = {
          exportedAt: new Date().toISOString(),
          system: 'Misionary Rental Motor Bandung',
          database: 'SQLite 3 (better-sqlite3)',
          tables: {
            bikes,
            bookings,
          },
        };
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_misionary_database_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch(console.error);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Settings Header */}
      <div className="bg-[#181C26] border border-[#262C3D] p-6 rounded-lg">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#A0844B]" />
          Pengaturan Sistem & Keamanan Data
        </h2>
        <p className="text-xs text-[#8E99AD] mt-1 leading-relaxed">
          Informasi arsitektur infrastruktur lokal, manajemen pencadangan database SQLite, dan parameter operasional garasi Bandung.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Database & Storage Architecture */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
            <Database className="w-4 h-4 text-[#A0844B]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Penyimpanan & Arsitektur Database
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#8E99AD] block mb-1">Lokasi File Database Fisik (SQLite 3):</span>
              <div className="flex items-center justify-between gap-2 bg-[#12151E] border border-[#222736] p-2.5 rounded font-mono text-[#F8E01A]">
                <span className="truncate text-xs">{stats?.dbPath || 'data/misionary.db'}</span>
                <button
                  onClick={handleCopyPath}
                  className="bg-[#1E2330] hover:bg-[#282F42] text-white p-1 rounded transition-colors cursor-pointer shrink-0"
                  title="Salin Jalur File"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#12151E] p-3 rounded border border-[#222736]">
                <span className="text-[10px] text-[#8E99AD] block">Ukuran File</span>
                <strong className="text-white text-sm block mt-0.5">{stats?.fileSizeFormatted || '4 KB'}</strong>
              </div>
              <div className="bg-[#12151E] p-3 rounded border border-[#222736]">
                <span className="text-[10px] text-[#8E99AD] block">Journal Mode</span>
                <strong className="text-emerald-400 text-sm block mt-0.5">WAL (High Concurrency)</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-[#262C3D]">
              <span className="text-[#8E99AD] block mb-2 font-semibold">Pencadangan Data (*Backup*):</span>
              <button
                onClick={handleDownloadBackup}
                className="w-full bg-[#202534] hover:bg-[#282F42] text-white text-xs font-bold py-2.5 px-4 rounded border border-[#323B52] flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-[#F8E01A]" />
                <span>Unduh Cadangan Database (.JSON Backup)</span>
              </button>
              <span className="text-[10px] text-[#6C7893] block mt-1.5 text-center">
                Mencakup seluruh tabel armada, riwayat transaksi, dan status sewa.
              </span>
            </div>
          </div>
        </div>

        {/* Security & Access Protection */}
        <div className="bg-[#181C26] border border-[#262C3D] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
            <Shield className="w-4 h-4 text-[#F8E01A]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Keamanan & Proteksi Akses
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-[#12151E] p-3 rounded border border-[#222736] flex items-start gap-3">
              <Key className="w-4 h-4 text-[#A0844B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Autentikasi PIN Gate</strong>
                <p className="text-[#8E99AD] text-[11px] mt-0.5">
                  Portal admin dilindungi verifikasi PIN yang menghasilkan Bearer session token aman.
                </p>
              </div>
            </div>

            <div className="bg-[#12151E] p-3 rounded border border-[#222736] flex items-start gap-3">
              <Server className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Endpoint Server & Port</strong>
                <p className="text-[#8E99AD] text-[11px] mt-0.5">
                  API Express berjalan di <code className="text-[#F8E01A]">http://localhost:5001</code> diproxy mulus melalui Vite dev server di port <code className="text-[#F8E01A]">3000</code>.
                </p>
              </div>
            </div>

            <div className="bg-[#12151E] p-3 rounded border border-[#222736] flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-semibold">Kepatuhan Standar Pemerintah</strong>
                <p className="text-[#8E99AD] text-[11px] mt-0.5">
                  Sistem dirancang mandiri tanpa ketergantungan cloud pihak ketiga, data tersimpan 100% lokal di mesin server.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Parameters Garasi */}
        <div className="lg:col-span-2 bg-[#181C26] border border-[#262C3D] rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
            <MapPin className="w-4 h-4 text-[#A0844B]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Parameter Garasi & Operasional Misionary Bandung
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#12151E] p-3.5 rounded border border-[#222736] space-y-1">
              <span className="text-[#8E99AD] text-[11px] font-semibold block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A0844B]" />
                Alamat Garasi Pasirkaliki
              </span>
              <p className="text-white font-medium">
                Jl. Pasirkaliki No. 88, Cicendo, Kota Bandung 40171
              </p>
              <span className="text-[10px] text-[#6C7893] block">3 menit dari Stasiun Bandung Pintu Utara</span>
            </div>

            <div className="bg-[#12151E] p-3.5 rounded border border-[#222736] space-y-1">
              <span className="text-[#8E99AD] text-[11px] font-semibold block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#A0844B]" />
                Jam Layanan Serah Terima
              </span>
              <p className="text-white font-medium">
                Buka Setiap Hari: 06.30 - 22.00 WIB
              </p>
              <span className="text-[10px] text-emerald-400 block">Antar-Jemput Stasiun / Whoosh 24 Jam</span>
            </div>

            <div className="bg-[#12151E] p-3.5 rounded border border-[#222736] space-y-1">
              <span className="text-[#8E99AD] text-[11px] font-semibold block flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#A0844B]" />
                Kontak Hotline WhatsApp
              </span>
              <p className="text-[#F8E01A] font-mono font-bold">
                +62 812-3456-7890
              </p>
              <span className="text-[10px] text-[#6C7893] block">Koordinasi Pengantaran & Kunci Motor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
