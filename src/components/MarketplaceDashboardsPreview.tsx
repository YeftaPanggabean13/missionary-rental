import React, { useState } from 'react';
import { LayoutDashboard, CheckCircle2, XCircle, Clock, Calendar, MessageSquare, Plus, DollarSign, Shield, ArrowUpRight } from 'lucide-react';

export const MarketplaceDashboardsPreview: React.FC = () => {
  const [roleView, setRoleView] = useState<'renter' | 'owner'>('owner');
  const [ownerRequestStatus, setOwnerRequestStatus] = useState<'pending' | 'approved' | 'declined'>('pending');
  const [extendRequested, setExtendRequested] = useState(false);

  return (
    <section className="py-16 bg-[#F0F2F4] border-b border-gray-200" id="dashboards">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#A0844B] mb-1">
              <LayoutDashboard className="w-4 h-4" />
              PRD Screen 05 & 06 · Interactive Platform Dashboards
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] tracking-tight">
              Peer-To-Peer Marketplace In Action
            </h2>
            <p className="text-[14px] text-[#555555] mt-1">
              Test drive the interface for both riders and motorcycle owners. Experience booking approvals, deposit management, and net payouts.
            </p>
          </div>

          {/* View toggle switch */}
          <div className="inline-flex bg-white p-1 rounded-[4px] border border-gray-300 shadow-xs self-start md:self-auto">
            <button
              onClick={() => setRoleView('owner')}
              className={`px-4 py-2 text-[13px] font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                roleView === 'owner'
                  ? 'bg-[#212121] text-white shadow-xs'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
              id="tab-owner-dashboard"
            >
              Owner Dashboard
            </button>
            <button
              onClick={() => setRoleView('renter')}
              className={`px-4 py-2 text-[13px] font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                roleView === 'renter'
                  ? 'bg-[#212121] text-white shadow-xs'
                  : 'text-[#555555] hover:text-[#212121]'
              }`}
              id="tab-renter-dashboard"
            >
              Renter Dashboard
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Display */}
        <div className="bg-white border border-gray-300 rounded-[6px] shadow-sm overflow-hidden">
          {/* Mockup Top Navigation Bar */}
          <div className="bg-[#212121] text-white px-5 py-3 flex items-center justify-between border-b border-[#333333]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A0844B]"></span>
              <span className="text-[13px] font-semibold tracking-wide">
                {roleView === 'owner' ? 'Marcus Thorne (Owner Account)' : 'Alex Henderson (Renter Account)'}
              </span>
              <span className="bg-[#333333] text-[#B5B5B5] text-[11px] px-2 py-0.5 rounded-[2px]">
                {roleView === 'owner' ? 'Verified Host · 4.98★' : 'Verified Rider · M1 Endorsement'}
              </span>
            </div>
            <div className="text-[12px] text-[#B5B5B5] hidden sm:block">
              Desktop-first PRD View
            </div>
          </div>

          {/* Role View: OWNER DASHBOARD */}
          {roleView === 'owner' && (
            <div className="p-6 space-y-6">
              {/* Earnings Overview Cards (PRD user story: net earnings after commission) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#F0F2F4] p-4 rounded-[4px] border border-gray-200">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    Total Net Payouts (Year-to-date)
                  </div>
                  <div className="text-2xl font-bold text-[#212121] mt-1">
                    $4,290.00
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    ✓ Direct deposit released after returns
                  </div>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] border border-gray-200">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    Commission Deducted (20%)
                  </div>
                  <div className="text-2xl font-bold text-[#555555] mt-1">
                    $1,072.50
                  </div>
                  <div className="text-[11px] text-[#888888] mt-0.5">
                    Covers $1M liability & payment fees
                  </div>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] border border-gray-200">
                  <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider">
                    Active Listed Motorcycles
                  </div>
                  <div className="text-2xl font-bold text-[#A0844B] mt-1">
                    1 Bike Listed
                  </div>
                  <div className="text-[11px] text-[#555555] mt-0.5">
                    2023 BMW R 1250 GS Adventure
                  </div>
                </div>
              </div>

              {/* Pending Booking Requests (PRD Screen 6 element: approve/decline) */}
              <div className="border border-gray-200 rounded-[4px] p-5 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F8E01A]"></span>
                    <h4 className="text-[15px] font-bold text-[#212121]">
                      Pending Booking Request
                    </h4>
                  </div>
                  <span className="text-[12px] text-[#888888]">
                    Received 45 mins ago · Expires in 23 hrs
                  </span>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 text-[13px]">
                    <div className="font-bold text-[#212121] text-[14px]">
                      Alex Henderson requested your BMW R 1250 GS
                    </div>
                    <div className="text-[#555555] flex flex-wrap items-center gap-3">
                      <span><strong>Dates:</strong> Oct 14 - Oct 17 (3 days)</span>
                      <span><strong>Handover:</strong> Denver Garage Pickup</span>
                      <span><strong>Rider Status:</strong> 5.0★ (4 previous rentals, M1 verified)</span>
                    </div>
                    <div className="text-[12px] text-[#212121] pt-1">
                      Gross Fee: $495.00 · Twisted Road (20%): -$99.00 · <strong>Your Net Payout: $396.00</strong>
                    </div>
                  </div>

                  {/* Approve / Decline Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    {ownerRequestStatus === 'pending' && (
                      <>
                        <button
                          onClick={() => setOwnerRequestStatus('declined')}
                          className="px-3 py-1.5 border border-gray-300 bg-white text-[#555555] hover:text-red-700 text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer"
                        >
                          Decline Request
                        </button>
                        <button
                          onClick={() => setOwnerRequestStatus('approved')}
                          className="px-4 py-1.5 bg-[#A0844B] hover:bg-[#8e743e] text-white text-[12px] font-bold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve Booking
                        </button>
                      </>
                    )}

                    {ownerRequestStatus === 'approved' && (
                      <div className="bg-emerald-100 text-emerald-800 text-[12px] font-bold px-3 py-1.5 rounded-[3px] flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        Trip Confirmed! Pre-auth hold activated.
                      </div>
                    )}

                    {ownerRequestStatus === 'declined' && (
                      <div className="bg-red-50 text-red-700 text-[12px] font-bold px-3 py-1.5 rounded-[3px] flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-red-600" />
                        Request Declined. No fees charged.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Listed Bikes Manager */}
              <div className="border border-gray-200 rounded-[4px] p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-[15px] font-bold text-[#212121]">
                    Your Motorcycles for Rent
                  </h4>
                  <span className="text-[12px] text-[#A0844B] font-semibold cursor-pointer hover:underline">
                    Edit Availability Calendar
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-[4px]">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=120&q=80"
                      alt="BMW GS"
                      className="w-14 h-10 object-cover rounded-[2px]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[13px]">
                      <strong className="text-[#212121] block">2023 BMW R 1250 GS Adventure</strong>
                      <span className="text-[#888888]">$165/day · $500 pre-auth deposit · Denver, CO</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-[2px]">
                    Active & Instant Inquiry
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Role View: RENTER DASHBOARD */}
          {roleView === 'renter' && (
            <div className="p-6 space-y-6">
              {/* Active & Upcoming Rentals (PRD Screen 5) */}
              <div className="border border-gray-200 rounded-[4px] p-5 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <h4 className="text-[15px] font-bold text-[#212121]">
                      Active / Upcoming Rental
                    </h4>
                  </div>
                  <span className="text-[12px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-[2px]">
                    Confirmed with Owner
                  </span>
                </div>

                <div className="bg-[#F0F2F4] p-4 rounded-[4px] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=160&q=80"
                      alt="Harley Davidson"
                      className="w-20 h-14 object-cover rounded-[3px]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-[13px] space-y-0.5">
                      <strong className="text-[#212121] text-[14px] block">
                        2022 Harley-Davidson Street Glide Special
                      </strong>
                      <span className="text-[#555555] block">
                        Owner: Jesse Walker (Los Angeles, CA)
                      </span>
                      <span className="text-[#888888] text-[12px] block">
                        Rental Dates: Friday, 10:00 AM - Sunday, 6:00 PM
                      </span>
                    </div>
                  </div>

                  {/* Actions: Extend Request, Message Owner */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => alert("Chat connected to Jesse Walker (Owner). Message thread active.")}
                      className="px-3 py-2 bg-white border border-gray-300 text-[#212121] hover:bg-gray-100 text-[12px] font-semibold rounded-[3px] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#A0844B]" />
                      Message Jesse
                    </button>

                    <button
                      onClick={() => setExtendRequested(true)}
                      className={`px-3 py-2 text-[12px] font-semibold rounded-[3px] transition-colors cursor-pointer flex items-center gap-1.5 ${
                        extendRequested
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-[#212121] text-white hover:bg-[#333333]'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {extendRequested ? 'Extension Request Sent' : 'Request 1-Day Extension'}
                    </button>
                  </div>
                </div>

                {/* Pre-auth deposit status reminder */}
                <div className="mt-3 text-[12px] text-[#555555] flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#A0844B]" />
                  <span>Security deposit of $500 is pre-authorized. Released within 48 hours of return photo inspection.</span>
                </div>
              </div>

              {/* Past Rentals History */}
              <div className="border border-gray-200 rounded-[4px] p-4 bg-white">
                <h4 className="text-[15px] font-bold text-[#212121] mb-3">
                  Past Rental Completed
                </h4>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-[4px] text-[13px]">
                  <div>
                    <strong className="text-[#212121]">2023 Triumph Bonneville T120 Black</strong>
                    <div className="text-[#888888] text-[12px]">Austin, TX · 2 Days · Completed Aug 12</div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-700 font-semibold block text-[12px]">
                      ✓ $400 Deposit Released
                    </span>
                    <span className="text-[11px] text-[#888888]">5.0★ Review Exchanged</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
