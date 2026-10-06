import React from 'react';
import { User, Mail, Phone, Shield, ShieldCheck, Key, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">User Account & Profile</h1>
        <p className="text-sm text-slate-500">Manage your clinical profile and credentials</p>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-teal-600/30">
              {user?.fullName ? user.fullName.charAt(0) : 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user?.fullName || 'User'}</h2>
              <p className="text-sm text-slate-400">@{user?.username || 'user'}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                {user?.role || 'ROLE_USER'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* User Details Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Email Address
            </span>
            <p className="text-sm font-semibold text-slate-800">{user?.email || 'N/A'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Phone Number
            </span>
            <p className="text-sm font-semibold text-slate-800">{user?.phone || 'Not registered'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Account Role Authority
            </span>
            <p className="text-sm font-semibold text-slate-800">
              {user?.role === 'ROLE_ADMIN'
                ? 'Full Administrative Access (CRUD on all data)'
                : user?.role === 'ROLE_DOCTOR'
                ? 'Physician Access (Patients, Appointments, EMR, Prescriptions)'
                : 'Patient Portal Access'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" /> Security Protocol
            </span>
            <p className="text-sm font-semibold text-slate-800">
              JWT Bearer Authentication • BCrypt Encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
