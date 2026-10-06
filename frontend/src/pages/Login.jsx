import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Lock, User, AlertCircle, ArrowRight, GraduationCap, ExternalLink } from 'lucide-react';
import useAuth from '../hooks/useAuth';

export const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 mb-4 shadow-xl backdrop-blur-md">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Med<span className="text-teal-400">Track</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Clinical Information & EMR System</p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-6">Enter your credentials to access your portal</p>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 transition-all shadow-lg shadow-teal-600/30 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Quick Demo Logins
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill('admin', 'password123')}
                className="py-1.5 px-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-medium border border-purple-200 transition-colors"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('dr.sarah', 'password123')}
                className="py-1.5 px-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-medium border border-teal-200 transition-colors"
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('john.doe', 'password123')}
                className="py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium border border-blue-200 transition-colors"
              >
                Patient
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Need an account?{' '}
            <Link to="/register" className="text-teal-600 font-semibold hover:underline">
              Register here
            </Link>
          </div>
        </div>

        {/* Featured Full Stack Courses Card (Eye-Catching on Auth Screen) */}
        <div className="mt-6 bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 border border-teal-500/30 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wide">
              Full Stack Development Training
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Want to build full-stack enterprise applications like this? Join hands-on training courses:
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <a
              href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span>Course in Delhi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://uncodemy.com/course/full-stack-development-training-course-in-noida"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 bg-cyan-700 hover:bg-cyan-600 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
            >
              <span>Course in Noida</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
