import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  FileText, 
  Pill, 
  UserCircle,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Patients', path: '/patients', icon: Users },
    { name: 'Doctors', path: '/doctors', icon: UserCheck },
    { name: 'Appointments', path: '/appointments', icon: Calendar },
    { name: 'Medical Records', path: '/medical-records', icon: FileText },
    { name: 'Prescriptions', path: '/prescriptions', icon: Pill },
    { name: 'My Profile', path: '/profile', icon: UserCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-6.5rem)] flex flex-col justify-between p-4 hidden md:flex shrink-0">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Clinical Workspace
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 shadow-sm shadow-teal-500/10 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        {/* Full Stack Training Courses Spotlight Card */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200/80 rounded-2xl p-3.5 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-teal-950 leading-tight">Full Stack Training</p>
              <p className="text-[10px] text-teal-700">Recommended Programs</p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <a
              href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-white hover:bg-teal-600 hover:text-white text-teal-800 rounded-lg text-xs font-semibold border border-teal-100 flex items-center justify-between transition-all group shadow-2xs"
            >
              <span>Course in Delhi</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-500 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://uncodemy.com/course/full-stack-development-training-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-white hover:bg-teal-600 hover:text-white text-teal-800 rounded-lg text-xs font-semibold border border-teal-100 flex items-center justify-between transition-all group shadow-2xs"
            >
              <span>Course in Noida</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Status Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-3.5 text-white shadow-md shadow-slate-900/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-semibold text-slate-300">System Online</span>
          </div>
          <p className="text-xs text-slate-400">MedTrack v1.0 • EMR Active</p>
          <div className="mt-2.5 pt-2.5 border-t border-slate-700 text-[11px] text-slate-400 flex justify-between items-center">
            <span>Local DB</span>
            <span className="text-emerald-400 font-medium">HIPAA Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
