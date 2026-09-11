import React from 'react';
import {
  RefreshCw,
  Plus,
  ExternalLink,
  Menu,
  PanelLeft,
  PanelLeftClose,
} from 'lucide-react';
import { AdminNavSection } from './AdminSidebar';

interface AdminTopbarProps {
  activeNav: AdminNavSection;
  onOpenManualBooking: () => void;
  onRefresh: () => void;
  loading: boolean;
  onToggleMobileMenu?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
}

const NAV_TITLES: Record<AdminNavSection, string> = {
  overview: 'Dashboard',
  bookings: 'Daftar Pemesanan',
  fleet: 'Manajemen Armada',
  schedule: 'Kalender Jadwal Armada',
  analytics: 'Laporan & Analitik',
  database: 'Database Explorer',
  settings: 'Pengaturan Sistem',
};

export const AdminTopbar: React.FC<AdminTopbarProps> = ({
  activeNav,
  onOpenManualBooking,
  onRefresh,
  loading,
  onToggleMobileMenu,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
}) => {
  const pageTitle = NAV_TITLES[activeNav] || 'Portal Operasional';

  return (
    <header className="h-14 bg-[#141721] border-b border-[#222736] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Collapse Toggle & Single Clean Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-1.5 rounded text-[#8E99AD] hover:text-white hover:bg-[#1E2330] cursor-pointer"
            title="Menu Navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {onToggleSidebarCollapse && (
          <button
            onClick={onToggleSidebarCollapse}
            className="hidden md:flex p-1.5 rounded text-[#8E99AD] hover:text-white hover:bg-[#1E2330] cursor-pointer transition-colors"
            title={isSidebarCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4 text-[#A0844B]" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        )}

        <h1 className="text-sm sm:text-base font-semibold text-white tracking-wide truncate">
          {pageTitle}
        </h1>
      </div>

      {/* Right: Clean Utility Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 rounded bg-[#1A1F2C] hover:bg-[#23293B] text-[#8E99AD] hover:text-white border border-[#2A3144] transition-colors cursor-pointer"
          title="Segarkan Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#A0844B]' : ''}`} />
        </button>

        {/* External Web Preview */}
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#8E99AD] hover:text-white bg-[#1A1F2C] hover:bg-[#23293B] border border-[#2A3144] px-3 py-1.5 rounded transition-colors"
          title="Buka Website Publik"
        >
          <span>Lihat Web</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        {/* Primary Action Button: Manual Booking */}
        <button
          onClick={onOpenManualBooking}
          className="bg-[#A0844B] hover:bg-[#8F7540] text-white text-xs font-semibold px-3.5 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Booking Manual</span>
        </button>
      </div>
    </header>
  );
};
