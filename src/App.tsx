import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Objectives } from './pages/Objectives';
import { Initiatives } from './pages/Initiatives';
import { Departments } from './pages/Departments';
import { Forum } from './pages/Forum';
import { Knowledge } from './pages/Knowledge';
import { Messages } from './pages/Messages';
import { Schedule } from './pages/Schedule';
import { Analytics } from './pages/Analytics';
import { Forecasting } from './pages/Forecasting';
import { Store } from './pages/Store';
import { Learning } from './pages/Learning';
import { Login } from './pages/auth/Login';
import { RequireAuth } from './components/auth/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';
import { CRM } from './pages/CRM';
import { SalesDashboard } from './pages/SalesDashboard';
import { Marketing } from './pages/Marketing';
import { DataRequest } from './pages/DataRequest';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/objectives" element={<Objectives />} />
                    <Route path="/initiatives" element={<Initiatives />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/forum/*" element={<Forum />} />
                    <Route path="/knowledge/*" element={<Knowledge />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/messages/:conversationId" element={<Messages />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/forecasting" element={<Forecasting />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/learning" element={<Learning />} />
                    <Route path="/crm" element={<CRM />} />
                    <Route path="/sales-dashboard" element={<SalesDashboard />} />
                    <Route path="/marketing" element={<Marketing />} />
                    <Route path="/data-request" element={<DataRequest />} />
                  </Routes>
                </Layout>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}