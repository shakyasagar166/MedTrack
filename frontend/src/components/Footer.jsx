import React from 'react';
import { ExternalLink, GraduationCap, Heart, Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white">
            <Activity className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800 text-sm">
            Med<span className="text-teal-600">Track</span>
          </span>
          <span className="text-slate-400 text-xs">© 2026 Hospital Management System</span>
        </div>

        {/* Featured Training Links - Highly Visible */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs bg-slate-50 border border-slate-200 py-2 px-4 rounded-2xl">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-teal-600" />
            Full Stack Development Training:
          </span>
          <a
            href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
          >
            <span>Delhi Course</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-300">•</span>
          <a
            href="https://uncodemy.com/course/full-stack-development-training-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
          >
            <span>Noida Course</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
