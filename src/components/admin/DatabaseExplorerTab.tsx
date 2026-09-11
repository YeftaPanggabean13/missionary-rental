import React, { useState, useEffect } from 'react';
import {
  Database,
  Table,
  Terminal,
  Download,
  Copy,
  Check,
  RefreshCw,
  Search,
  HardDrive,
  FileCode,
  ExternalLink,
  Play
} from 'lucide-react';

interface DatabaseExplorerTabProps {
  token: string;
}

interface DbStats {
  dbPath: string;
  fileSizeBytes: number;
  fileSizeFormatted: string;
  journalMode: string;
  tableCounts: Record<string, number>;
  tables: string[];
}

export const DatabaseExplorerTab: React.FC<DatabaseExplorerTabProps> = ({ token }) => {
  const [stats, setStats] = useState<DbStats | null>(null);
  const [activeTable, setActiveTable] = useState<string>('bookings');
  const [tableData, setTableData] = useState<{ total: number; rows: any[] } | null>(null);
  const [loadingTable, setLoadingTable] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  // SQL Console state
  const [sqlQuery, setSqlQuery] = useState(
    'SELECT bookingCode, customerName, bikeName, rentalDays, totalAmount, status FROM bookings ORDER BY id DESC'
  );
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [runningQuery, setRunningQuery] = useState(false);

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/database/stats', { headers });
      const json = await res.json();
      if (json.success) setStats(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTable = async (tableName: string) => {
    setLoadingTable(true);
    try {
      const res = await fetch(`/api/admin/database/table/${tableName}?limit=100`, { headers });
      const json = await res.json();
      if (json.success) setTableData(json.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchTable(activeTable);
  }, [token]);

  const handleTableChange = (t: string) => {
    setActiveTable(t);
    fetchTable(t);
    setFilterQuery('');
  };

  const handleCopyPath = () => {
    if (stats?.dbPath) {
      navigator.clipboard.writeText(stats.dbPath);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExecuteQuery = async () => {
    if (!sqlQuery.trim()) return;
    setRunningQuery(true);
    setQueryError(null);
    try {
      const res = await fetch('/api/admin/database/query', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: sqlQuery.trim() }),
      });
      const json = await res.json();
      if (!res.ok) {
        setQueryError(json.error || 'Terjadi kesalahan saat mengeksekusi query.');
        setQueryResult(null);
      } else {
        setQueryResult(json.data);
        setQueryError(null);
      }
    } catch {
      setQueryError('Koneksi ke server gagal.');
      setQueryResult(null);
    } finally {
      setRunningQuery(false);
    }
  };

  const handleExportJSON = () => {
    if (!tableData || !tableData.rows) return;
    const blob = new Blob([JSON.stringify(tableData.rows, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `misionary_${activeTable}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter displayed rows
  const filteredRows = (tableData?.rows || []).filter((row) => {
    if (!filterQuery) return true;
    const str = JSON.stringify(row).toLowerCase();
    return str.includes(filterQuery.toLowerCase());
  });

  const columns = filteredRows.length > 0 ? Object.keys(filteredRows[0]) : [];

  return (
    <div className="space-y-6">
      {/* DB Overview Banner & Direct Access Instruction */}
      <div className="bg-[#212121] border border-[#333333] rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#A0844B]/20 text-[#A0844B] px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                SQLite 3 Storage
              </span>
              <span className="text-xs text-[#888888]">Engine: better-sqlite3 WAL</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Akses Database Langsung & Manajemen Tabel
            </h2>
            <p className="text-xs text-[#B5B5B5] max-w-2xl leading-relaxed">
              Data platform Misionary disimpan dalam database SQLite lokal yang persisten. Anda dapat mengaksesnya langsung melalui aplikasi eksternal seperti <strong>DB Browser for SQLite</strong>, <strong>DBeaver</strong>, ekstensi IDE <strong>SQLite Viewer</strong>, atau menggunakan konsol query di bawah ini.
            </p>
          </div>

          {/* Direct File Path Card with Copy Button */}
          <div className="bg-[#181818] border border-[#333333] rounded-lg p-4 min-w-[320px]">
            <span className="text-[11px] uppercase tracking-wider text-[#888888] font-bold block mb-1.5 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-[#A0844B]" />
              Lokasi File Database Fisik
            </span>
            <div className="flex items-center justify-between gap-2 bg-[#121212] border border-[#2a2a2a] p-2 rounded">
              <code className="text-xs font-mono text-[#F8E01A] truncate max-w-[220px]" title={stats?.dbPath}>
                {stats?.dbPath || 'data/misionary.db'}
              </code>
              <button
                onClick={handleCopyPath}
                className="bg-[#2a2a2a] hover:bg-[#333333] text-white p-1.5 rounded transition-colors cursor-pointer shrink-0"
                title="Salin Jalur File"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#888888] mt-2 pt-2 border-t border-[#2a2a2a]">
              <span>Ukuran: <strong>{stats?.fileSizeFormatted || '4 KB'}</strong></span>
              <span>Mode: <strong>WAL</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Selector and Data Grid */}
      <div className="bg-[#212121] border border-[#333333] rounded-lg overflow-hidden">
        {/* Table Selection Header */}
        <div className="bg-[#1a1a1a] px-6 py-4 border-b border-[#333333] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {(stats?.tables || ['bikes', 'bookings', 'admin_sessions']).map((tbl) => (
              <button
                key={tbl}
                onClick={() => handleTableChange(tbl)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-md flex items-center gap-2 transition-colors cursor-pointer ${
                  activeTable === tbl
                    ? 'bg-[#A0844B] text-white'
                    : 'bg-[#252525] text-[#B5B5B5] hover:text-white hover:bg-[#303030]'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span className="capitalize">{tbl}</span>
                <span className="bg-black/30 text-white/90 text-[10px] px-1.5 py-0.2 rounded-full">
                  {stats?.tableCounts[tbl] ?? '-'}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={`Cari di ${activeTable}...`}
                className="bg-[#252525] border border-[#3a3a3a] text-white text-xs pl-8 pr-3 py-1.5 rounded focus:outline-none focus:border-[#A0844B] w-48"
              />
            </div>
            <button
              onClick={handleExportJSON}
              className="bg-[#252525] hover:bg-[#333333] text-[#E0E0E0] border border-[#3a3a3a] text-xs px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer"
              title="Unduh Tabel sebagai JSON"
            >
              <Download className="w-3.5 h-3.5 text-[#A0844B]" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={() => fetchTable(activeTable)}
              className="bg-[#252525] hover:bg-[#333333] text-white p-1.5 rounded border border-[#3a3a3a] cursor-pointer"
              title="Segarkan Tabel"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingTable ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto max-h-[420px]">
          {loadingTable ? (
            <div className="py-16 text-center text-xs text-[#888888] flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-[#A0844B]" />
              Memuat isi tabel {activeTable}...
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="py-16 text-center text-xs text-[#888888]">
              Tidak ada data yang ditemukan di tabel <strong>{activeTable}</strong>.
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#1c1c1c] text-[#888888] sticky top-0 z-10 border-b border-[#333333]">
                <tr>
                  <th className="py-2.5 px-4 font-mono font-bold text-[11px] text-[#A0844B]">#</th>
                  {columns.map((col) => (
                    <th key={col} className="py-2.5 px-4 font-semibold uppercase tracking-wider text-[11px]">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a] font-mono text-[11px]">
                {filteredRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#252525]/60 transition-colors">
                    <td className="py-2.5 px-4 text-[#666666]">{idx + 1}</td>
                    {columns.map((col) => {
                      const val = row[col];
                      const valStr = typeof val === 'object' ? JSON.stringify(val) : String(val ?? '');
                      return (
                        <td
                          key={col}
                          className="py-2.5 px-4 text-[#D0D0D0] max-w-[260px] truncate"
                          title={valStr}
                        >
                          {valStr}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="bg-[#1a1a1a] px-6 py-2.5 border-t border-[#333333] text-[11px] text-[#888888] flex justify-between items-center">
          <span>Menampilkan {filteredRows.length} dari {tableData?.total || 0} baris di tabel <strong>{activeTable}</strong></span>
          <span>Database Engine: SQLite 3.x</span>
        </div>
      </div>

      {/* Embedded Safe SQL Runner Console */}
      <div className="bg-[#212121] border border-[#333333] rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#F8E01A]" />
            Konsol SQL Query Runner (Read-Only)
          </h3>
          <span className="text-[11px] text-[#888888]">
            Hanya perintah <code className="text-[#F8E01A]">SELECT</code> yang diizinkan untuk keamanan data.
          </span>
        </div>

        {/* Quick Query Templates */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() =>
              setSqlQuery(
                'SELECT bookingCode, customerName, bikeName, rentalDays, totalAmount, status FROM bookings ORDER BY id DESC LIMIT 10'
              )
            }
            className="text-[11px] bg-[#2a2a2a] hover:bg-[#333333] text-[#B5B5B5] px-2.5 py-1 rounded border border-[#3a3a3a] cursor-pointer"
          >
            Pemesanan Terbaru
          </button>
          <button
            onClick={() =>
              setSqlQuery(
                'SELECT make, model, platNomor, dailyRate, status FROM bikes'
              )
            }
            className="text-[11px] bg-[#2a2a2a] hover:bg-[#333333] text-[#B5B5B5] px-2.5 py-1 rounded border border-[#3a3a3a] cursor-pointer"
          >
            Daftar Armada Motor
          </button>
          <button
            onClick={() =>
              setSqlQuery(
                'SELECT status, COUNT(*) as jumlah, SUM(totalAmount) as total FROM bookings GROUP BY status'
              )
            }
            className="text-[11px] bg-[#2a2a2a] hover:bg-[#333333] text-[#B5B5B5] px-2.5 py-1 rounded border border-[#3a3a3a] cursor-pointer"
          >
            Ringkasan Status & Omset
          </button>
        </div>

        {/* SQL Input Textarea */}
        <div className="relative">
          <textarea
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            rows={3}
            className="w-full bg-[#141414] border border-[#333333] rounded-lg p-3 text-xs font-mono text-white focus:outline-none focus:border-[#A0844B]"
            placeholder="SELECT * FROM bikes WHERE status = 'TERSEDIA';"
          />
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[11px] text-[#666666]">
            Tekan tombol untuk mengeksekusi langsung query terhadap SQLite database lokal.
          </span>
          <button
            onClick={handleExecuteQuery}
            disabled={runningQuery}
            className="bg-[#A0844B] hover:bg-[#8f743f] disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {runningQuery ? 'Mengeksekusi...' : 'Jalankan Query'}
          </button>
        </div>

        {/* Query Error Message */}
        {queryError && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-700/50 text-red-300 text-xs rounded-lg font-mono">
            Error: {queryError}
          </div>
        )}

        {/* Query Result Grid */}
        {queryResult && (
          <div className="mt-4 border border-[#333333] rounded-lg overflow-hidden">
            <div className="bg-[#181818] px-4 py-2 text-[11px] font-bold text-emerald-400 border-b border-[#333333] flex justify-between items-center">
              <span>Hasil Eksekusi: {queryResult.length} baris dikembalikan</span>
              <span className="text-[#888888] font-normal font-mono">Query Sukses</span>
            </div>
            {queryResult.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#888888]">
                Query berhasil dieksekusi, tetapi tidak mengembalikan baris data (0 rows).
              </div>
            ) : (
              <div className="overflow-x-auto max-h-[300px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1f1f1f] text-[#888888] sticky top-0 font-mono text-[10px] uppercase">
                    <tr>
                      {Object.keys(queryResult[0]).map((key) => (
                        <th key={key} className="py-2 px-3 border-b border-[#333333]">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a2a] font-mono text-[11px]">
                    {queryResult.map((row, i) => (
                      <tr key={i} className="hover:bg-[#282828] transition-colors">
                        {Object.values(row).map((val: any, j) => (
                          <td key={j} className="py-2 px-3 text-[#D0D0D0] truncate max-w-[200px]">
                            {typeof val === 'object' ? JSON.stringify(val) : String(val ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
