import React from 'react';
import { PropertyProvider, useProperty } from './context/PropertyContext';
import { Header } from './components/Header';
import { DesktopSidebar } from './components/DesktopSidebar';
import { BottomNav } from './components/BottomNav';
import { DashboardGreeting } from './components/DashboardGreeting';
import { MoneyStrip } from './components/MoneyStrip';
import { StatusStrip } from './components/StatusStrip';
import { OccupancyEfficiencyCard } from './components/OccupancyEfficiencyCard';
import { LiveRentRollWidget } from './components/LiveRentRollWidget';
import { ManagerDashboardView } from './components/ManagerDashboardView';
import { TenantDashboardView } from './components/TenantDashboardView';
import { PropertiesView } from './components/PropertiesView';
import { ComplaintsView } from './components/ComplaintsView';
import { MoreView } from './components/MoreView';
import { HelpCenterView } from './components/HelpCenterView';
import { SettingsView } from './components/SettingsView';
import { QuickAddSheet } from './components/QuickAddSheet';
import { ReceiptModal } from './components/ReceiptModal';
import { TenantQRModal } from './components/TenantQRModal';
import { AgingModal } from './components/AgingModal';
import { NotificationsModal } from './components/NotificationsModal';
import { AIChatbotModal } from './components/AIChatbotModal';

import { EditorialLandingView } from './components/EditorialLandingView';

const AppContent: React.FC = () => {
  const { activeTab } = useProperty();

  if (activeTab === 'landing') {
    return <EditorialLandingView />;
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] flex text-[#012169] font-sans antialiased selection:bg-[#009cde] selection:text-white">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content Area with Desktop Sidebar Offset */}
      <div className="flex-1 flex flex-col min-w-0 pb-28 lg:pb-12 lg:pl-64">
        <Header />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <DashboardGreeting />
              <MoneyStrip />
              <StatusStrip />
              <OccupancyEfficiencyCard />
              <LiveRentRollWidget />
            </div>
          )}

          {activeTab === 'manager-dashboard' && (
            <ManagerDashboardView />
          )}

          {activeTab.startsWith('tenant-') && (
            <TenantDashboardView />
          )}

          {activeTab === 'properties' && (
            <div className="animate-in fade-in duration-300">
              <PropertiesView />
            </div>
          )}

          {activeTab === 'complaints' && (
            <div className="animate-in fade-in duration-300">
              <ComplaintsView />
            </div>
          )}

          {activeTab === 'more' && (
            <div className="animate-in fade-in duration-300">
              <MoreView />
            </div>
          )}

          {activeTab === 'help' && (
            <div className="animate-in fade-in duration-300">
              <HelpCenterView />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-in fade-in duration-300">
              <SettingsView />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Global Drawers & Modals */}
      <QuickAddSheet />
      <ReceiptModal />
      <TenantQRModal />
      <AgingModal />
      <NotificationsModal />
      <AIChatbotModal />
    </div>
  );
};

export function App() {
  return (
    <PropertyProvider>
      <AppContent />
    </PropertyProvider>
  );
}

export default App;
