import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  UserCheck, 
  Pill, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import patientService from '../services/patientService';
import doctorService from '../services/doctorService';
import appointmentService from '../services/appointmentService';
import AppointmentCard from '../components/AppointmentCard';

export const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    patientsCount: 0,
    doctorsCount: 0,
    appointmentsCount: 0,
    pendingAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [patients, doctors, appointments] = await Promise.all([
        patientService.getAll(),
        doctorService.getAll(),
        appointmentService.getAll()
      ]);

      const pending = appointments.filter(a => a.status === 'PENDING').length;

      setStats({
        patientsCount: patients.length,
        doctorsCount: doctors.length,
        appointmentsCount: appointments.length,
        pendingAppointments: pending
      });

      setRecentAppointments(appointments.slice(0, 4));
      setRecentPatients(patients.slice(0, 4));
    } catch (err) {
      console.error('Error loading dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentService.updateStatus(id, newStatus);
      loadDashboardData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-teal-700/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-teal-200 text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Clinical Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Hello, {user?.fullName || user?.username || 'Doctor'}!
          </h1>
          <p className="text-teal-100 text-sm mt-1 max-w-xl">
            You have {stats.pendingAppointments} pending appointments requiring clinical review today.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/appointments"
            className="px-4 py-2.5 bg-white text-teal-800 rounded-xl text-sm font-bold shadow-md hover:bg-teal-50 transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            Book Visit
          </Link>
          <Link
            to="/patients"
            className="px-4 py-2.5 bg-teal-800/60 hover:bg-teal-800 text-white rounded-xl text-sm font-semibold border border-white/20 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            New Patient
          </Link>
        </div>
      </div>

      {/* Featured Full Stack Training Spotlight (High Visibility) */}
      <div className="bg-gradient-to-r from-teal-500/10 via-white to-cyan-500/10 rounded-3xl p-5 sm:p-6 border-2 border-teal-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-600/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-100 text-teal-800 uppercase tracking-wider">
                Industry Training
              </span>
              <span className="text-xs text-slate-400 font-medium">Full Stack Development Course</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Want to build full-stack enterprise platforms like MedTrack?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Explore professional hands-on Full Stack Development Training with placement assistance:
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 flex-wrap sm:flex-nowrap">
          <a
            href="https://uncodemy.com/course/full-stack-development-training-course-in-delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-teal-600/20 flex items-center justify-center gap-1.5"
          >
            <span>Training in Delhi</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://uncodemy.com/course/full-stack-development-training-course-in-noida"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-slate-900/20 flex items-center justify-center gap-1.5"
          >
            <span>Training in Noida</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Registered Patients</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{stats.patientsCount}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12% this month
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Active Doctors</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{stats.doctorsCount}</p>
            <p className="text-xs text-slate-400 mt-1">Across 3 departments</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Total Appointments</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{stats.appointmentsCount}</p>
            <p className="text-xs text-slate-400 mt-1">Scheduled in system</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase">Pending Review</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{stats.pendingAppointments}</p>
            <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Awaiting doctor
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grid: Upcoming Appointments & Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Appointments</h2>
              <p className="text-xs text-slate-500">Upcoming and ongoing patient visits</p>
            </div>
            <Link
              to="/appointments"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              View All ({stats.appointmentsCount})
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentAppointments.length === 0 ? (
              <div className="col-span-2 p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
                No appointments scheduled yet.
              </div>
            ) : (
              recentAppointments.map((apt) => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        </div>

        {/* Patients Sidebar List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Patients</h2>
              <p className="text-xs text-slate-500">Recently admitted</p>
            </div>
            <Link
              to="/patients"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              All Patients
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 divide-y divide-slate-100">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 font-bold text-sm flex items-center justify-center">
                    {patient.firstName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      {patient.firstName} {patient.lastName}
                    </h4>
                    <p className="text-xs text-slate-400">{patient.phone}</p>
                  </div>
                </div>

                <Link
                  to={`/patients/${patient.id}`}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-700 rounded-lg transition-colors border border-slate-100"
                >
                  Details
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Info Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 border border-teal-100">
            <h4 className="text-sm font-bold text-teal-900">Medical Records & Prescriptions</h4>
            <p className="text-xs text-teal-700 mt-1">
              Easily generate electronic prescriptions, view lab results, and review medical history in the EMR tab.
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                to="/medical-records"
                className="text-xs font-bold text-teal-700 hover:text-teal-900 underline"
              >
                Go to Records &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
