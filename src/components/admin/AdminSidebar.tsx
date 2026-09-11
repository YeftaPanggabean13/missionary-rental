import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Bike,
  BarChart3,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export type AdminNavSection =
  | 'overview'
  | 'bookings'
  | 'fleet'
  | 'schedule'
  | 'analytics'
  | 'database'
  | 'settings';

interface AdminSidebarProps {
  activeNav: AdminNavSection;
  onNavChange: (nav: AdminNavSection) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  bookingCount: number;
  bikeCount: number;
  onLogout: () => void;
}

interface NavItem {
  id: AdminNavSection;
  label: string;
  icon: React.ElementType;
  badge?: number | string;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeNav,
  onNavChange,
  isCollapsed,
  onToggleCollapse,
  bookingCount,
  bikeCount,
  onLogout,
}) => {
  const groups: NavGroup[] = [
    {
      title: 'IKHTISAR UTAMA',
      items: [
        {
          id: 'overview',
          label: 'Dashboard',
          icon: LayoutDashboard,
        },
        {
          id: 'bookings',
          label: 'Daftar Pemesanan',
          icon: ClipboardList,
          badge: bookingCount,
          badgeColor: 'bg-[#A0844B] text-white',
        },
        {
          id: 'schedule',
          label: 'Kalender Jadwal',
          icon: Calendar,
        },
      ],
    },
    {
      title: 'LOGISTIK & ARMADA',
      items: [
        {
          id: 'fleet',
          label: 'Manajemen Armada',
          icon: Bike,
          badge: `${bikeCount} Unit`,
          badgeColor: 'bg-[#2a2a2a] text-[#F8E01A]',
        },
      ],
    },
    {
      title: 'INTELIJEN & DATA',
      items: [
        {
          id: 'analytics',
          label: 'Analitik & Laporan',
          icon: BarChart3,
        },
        {
          id: 'database',
          label: 'Database Explorer',
          icon: Database,
        },
      ],
    },
    {
      title: 'SISTEM',
      items: [
        {
          id: 'settings',
          label: 'Pengaturan & Backup',
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <aside
      className={`bg-[#12151D] border-r border-[#222736] flex flex-col transition-all duration-300 select-none z-30 shrink-0 ${isCollapsed ? 'w-[72px]' : 'w-64'
        }`}
    >
      {/* Brand Header */}
      <div className="h-16 border-b border-[#222736] flex items-center justify-between px-4">
        {isCollapsed ? (
          <div className="w-full flex justify-center" title="Misionary Rental Bandung">
            <img
              src="/img/missionary-mark-white.png"
              alt="Misionary"
              className="h-7 w-auto object-contain opacity-95"
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <img
              src="/img/missionary-horizontal-white.png"
              alt="Misionary Rental Bandung"
              className="h-6 w-auto object-contain self-start opacity-95"
            />
          </div>
        )}
      </div>

      {/* Navigation Menu List */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6 scrollbar-thin">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#5A6478]">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavChange(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors cursor-pointer group relative ${isActive
                    ? 'bg-[#1D2230] text-[#F8E01A] border-l-3 border-[#F8E01A] pl-[9px]'
                    : 'text-[#8E99AD] hover:text-white hover:bg-[#181C26]'
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#F8E01A]' : 'text-[#6C7893] group-hover:text-white'
                      }`}
                  />
                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${item.badgeColor || 'bg-[#2a2a2a] text-[#B5B5B5]'
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Compact Tooltip */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1 bg-[#1A1F2C] text-white text-xs font-medium rounded border border-[#2D3548] shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                      {item.label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Area: Collapse Button & Operator Profile */}
      <div className="border-t border-[#222736] p-3 space-y-2 bg-[#0E1017]">
        {/* Toggle Collapse Button */}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-1.5 rounded text-[#7B879E] hover:text-white hover:bg-[#181C26] text-xs font-medium transition-colors cursor-pointer"
          title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar (Compact)'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-[11px] font-semibold">Ciutkan Sidebar</span>
            </>
          )}
        </button>

        {/* Operator Profile Card */}
        <div
          className={`flex items-center gap-2.5 p-2 rounded-md bg-[#161A24] border border-[#222736] ${isCollapsed ? 'justify-center' : 'justify-between'
            }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#A0844B]/20 border border-[#A0844B]/40 text-[#A0844B] flex items-center justify-center shrink-0">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate">Admin Pengawas</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Aktif Bertugas
                </span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onLogout}
              className="p-1 rounded text-[#7B879E] hover:text-rose-400 hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Keluar dari Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
