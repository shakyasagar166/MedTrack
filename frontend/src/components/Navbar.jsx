import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Bell, User as UserIcon, LogOut, ShieldCheck, GraduationCap, ExternalLink } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full font-medium">Admin</span>;
      case 'ROLE_DOCTOR':
        return <span className="bg-teal-100 text-teal-700 text-xs px-2 py-0.5 rounded-full font-medium">Doctor</span>;
      case 'ROLE_PATIENT':
        return <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">Patient</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full font-medium">Staff</span>;
    }
  };

  return (
    <header className="sticky top-0 z-30">
      {/* Top Eye-Catching Course Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-white text-xs py-2 px-4 border-b border-teal-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-md font-semibold text-[11px]">
              <GraduationCap className="w-3.5 h-3.5" />
              Featured Training
            </span>
            <span className="text-slate-200 font-medium">
              Want to master Full Stack Web Development?
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 hover:text-white font-bold transition-all border border-teal-400/30"
              title="Full Stack Development Training Course in Delhi"
            >
              <span>Delhi Campus Course</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-teal-500/50">|</span>
            <a
              href="https://uncodemy.com/course/full-stack-development-training-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 hover:text-white font-bold transition-all border border-cyan-400/30"
              title="Full Stack Development Training Course in Noida"
            >
              <span>Noida Campus Course</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  Med<span className="text-teal-600">Track</span>
                </span>
              </Link>
              <span className="hidden sm:inline-block ml-3 px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-700 text-xs font-semibold uppercase tracking-wider">
                Health System
              </span>
            </div>

            {/* Right Header Navigation */}
            {user && (
              <div className="flex items-center space-x-4">
                <button 
                  title="Notifications"
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                </button>

                <div className="h-6 w-px bg-slate-200"></div>

                {/* User Pill */}
                <Link to="/profile" className="flex items-center space-x-3 group">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-semibold group-hover:border-teal-500 transition-colors">
                    {user.fullName ? user.fullName.charAt(0) : 'U'}
                  </div>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-teal-600 transition-colors">
                      {user.fullName || user.username}
                    </span>
                    <div className="mt-0.5">
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
