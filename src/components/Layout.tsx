import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Briefcase, 
  Users, 
  LogOut,
  Home,
  MessageCircle,
  Book,
  MessageSquare,
  Calendar,
  Calculator,
  BarChart2,
  Store,
  GraduationCap,
  LineChart,
  UserSquare2,
  Megaphone,
  FileSpreadsheet,
  DatabaseZap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NavItem } from './layout/NavItem';
import { SidebarToggle } from './layout/SidebarToggle';
import { useUIStore } from '../stores/uiStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { signOut } = useAuth();
  const { sidebarCollapsed } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`relative bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <SidebarToggle />
        
        <div className="p-6">
          <div className={`flex items-center gap-3 mb-8 ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}>
            <Home className="h-8 w-8 text-indigo-600 flex-shrink-0" />
            <span className={`text-xl font-bold transition-opacity duration-200 ${
              sidebarCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`}>
              Vacation Rental OS
            </span>
          </div>

          <nav className="space-y-6">
            {/* Business Operations */}
            <div className="space-y-1">
              <div className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                sidebarCollapsed ? 'sr-only' : ''
              }`}>
                Business Operations
              </div>
              <NavItem
                to="/schedule"
                icon={<Calendar className="h-5 w-5" />}
                label="My Focus"
                active={location.pathname === '/schedule'}
              />
              <NavItem
                to="/"
                icon={<LayoutDashboard className="h-5 w-5" />}
                label="Strategy Map"
                active={location.pathname === '/'}
              />
              <NavItem
                to="/objectives"
                icon={<Target className="h-5 w-5" />}
                label="Objectives"
                active={location.pathname === '/objectives'}
              />
              <NavItem
                to="/initiatives"
                icon={<Briefcase className="h-5 w-5" />}
                label="Initiatives"
                active={location.pathname === '/initiatives'}
              />
              <NavItem
                to="/departments"
                icon={<Users className="h-5 w-5" />}
                label="Departments"
                active={location.pathname === '/departments'}
              />
            </div>

            {/* Sales & Marketing */}
            <div className="space-y-1">
              <div className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                sidebarCollapsed ? 'sr-only' : ''
              }`}>
                Sales & Marketing
              </div>
              <NavItem
                to="/sales-dashboard"
                icon={<LineChart className="h-5 w-5" />}
                label="Sales Dashboard"
                active={location.pathname === '/sales-dashboard'}
              />
              <NavItem
                to="/crm"
                icon={<UserSquare2 className="h-5 w-5" />}
                label="CRM"
                active={location.pathname === '/crm'}
              />
              <NavItem
                to="/marketing"
                icon={<Megaphone className="h-5 w-5" />}
                label="Marketing"
                active={location.pathname === '/marketing'}
              />
              <NavItem
                to="/data-request"
                icon={<DatabaseZap className="h-5 w-5" />}
                label="Data Request"
                active={location.pathname === '/data-request'}
              />
            </div>

            {/* Business Analytics */}
            <div className="space-y-1">
              <div className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                sidebarCollapsed ? 'sr-only' : ''
              }`}>
                Business Analytics
              </div>
              <NavItem
                to="/analytics"
                icon={<BarChart2 className="h-5 w-5" />}
                label="Analytics"
                active={location.pathname === '/analytics'}
              />
              <NavItem
                to="/forecasting"
                icon={<Calculator className="h-5 w-5" />}
                label="Forecasting"
                active={location.pathname === '/forecasting'}
              />
            </div>

            {/* Community */}
            <div className="space-y-1">
              <div className={`px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                sidebarCollapsed ? 'sr-only' : ''
              }`}>
                Community
              </div>
              <NavItem
                to="/knowledge"
                icon={<Book className="h-5 w-5" />}
                label="Knowledge Base"
                active={location.pathname.startsWith('/knowledge')}
              />
              <NavItem
                to="/forum"
                icon={<MessageCircle className="h-5 w-5" />}
                label="Forum"
                active={location.pathname.startsWith('/forum')}
              />
              <NavItem
                to="/learning"
                icon={<GraduationCap className="h-5 w-5" />}
                label="Learning"
                active={location.pathname === '/learning'}
              />
              <NavItem
                to="/messages"
                icon={<MessageSquare className="h-5 w-5" />}
                label="Messages"
                active={location.pathname.startsWith('/messages')}
              />
              <NavItem
                to="/store"
                icon={<Store className="h-5 w-5" />}
                label="Store"
                active={location.pathname === '/store'}
              />
            </div>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-200">
          <button
            onClick={() => signOut()}
            className={`flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors w-full px-4 py-2 rounded-lg hover:bg-gray-100 ${
              sidebarCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="h-5 w-5" />
            <span className={`transition-opacity duration-200 ${
              sidebarCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'
            }`}>
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}