import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Landing Page
import LandingPage from './pages/landing/LandingPage';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/projects/Projects';
import ProjectDetail from './pages/projects/ProjectDetail';
import Datasets from './pages/datasets/Datasets';
import DatasetDetail from './pages/datasets/DatasetDetail';
import Experiments from './pages/experiments/Experiments';
import ExperimentDetail from './pages/experiments/ExperimentDetail';
import Models from './pages/models/Models';
import ModelDetail from './pages/models/ModelDetail';
import Predictions from './pages/predictions/Predictions';
import ServerInstances from './pages/servers/ServerInstances';
import Profile from './pages/profile/Profile';
import Credits from './pages/credits/Credits';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Route>
            
            {/* Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="datasets" element={<Datasets />} />
              <Route path="datasets/:id" element={<DatasetDetail />} />
              <Route path="experiments" element={<Experiments />} />
              <Route path="experiments/:id" element={<ExperimentDetail />} />
              <Route path="models" element={<Models />} />
              <Route path="models/:id" element={<ModelDetail />} />
              <Route path="predictions" element={<Predictions />} />
              <Route path="server-instances" element={<ServerInstances />} />
              <Route path="profile" element={<Profile />} />
              <Route path="credits" element={<Credits />} />
            </Route>
          </Routes>
          <ToastContainer position="top-right" />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;