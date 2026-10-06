import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Droplets, 
  AlertTriangle, 
  FileText, 
  Pill, 
  Clock 
} from 'lucide-react';
import patientService from '../services/patientService';
import appointmentService from '../services/appointmentService';
import medicalRecordService from '../services/medicalRecordService';
import prescriptionService from '../services/prescriptionService';

export const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadPatientData();
  }, [id]);

  const loadPatientData = async () => {
    try {
      setLoading(true);
      const [pat, appts, records, rxList] = await Promise.all([
        patientService.getById(id),
        appointmentService.getByPatient(id),
        medicalRecordService.getByPatient(id),
        prescriptionService.getByPatient(id)
      ]);
      setPatient(pat);
      setAppointments(appts);
      setMedicalRecords(records);
      setPrescriptions(rxList);
    } catch (err) {
      console.error('Error fetching patient data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-slate-500">Loading patient file...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <h3 className="text-base font-bold text-slate-700">Patient not found</h3>
        <Link to="/patients" className="mt-4 inline-block text-teal-600 font-semibold text-sm hover:underline">
          &larr; Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Link
          to="/patients"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Patient Directory
        </Link>
      </div>

      {/* Patient Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 text-2xl font-black">
              {patient.firstName ? patient.firstName.charAt(0) : 'P'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-slate-900">
                  {patient.firstName} {patient.lastName}
                </h1>
                {patient.bloodGroup && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    <Droplets className="w-3.5 h-3.5 text-rose-500" />
                    {patient.bloodGroup}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Medical Record #{patient.id} • {patient.gender || 'Not specified'} • DOB: {patient.dateOfBirth || 'Unknown'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {patient.phone}
            </div>
            {patient.email && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {patient.email}
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex gap-4 overflow-x-auto">
          {['overview', 'records', 'appointments', 'prescriptions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold capitalize border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              {tab === 'records' ? 'Medical Records' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
              Demographic & Contact Info
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Residential Address</span>
                <span className="text-slate-700 font-medium">{patient.address || 'No address registered'}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">Emergency Contact</span>
                  <span className="text-slate-700 font-medium">{patient.emergencyContactName || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Emergency Phone</span>
                  <span className="text-slate-700 font-medium">{patient.emergencyContactPhone || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
              Clinical Background
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Known Allergies</span>
                <span className="inline-block mt-1 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg font-medium text-xs">
                  {patient.allergies || 'No known drug allergies reported'}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Medical History</span>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {patient.medicalHistory || 'No historical chronic diseases logged.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="space-y-4">
          {medicalRecords.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
              No clinical medical records filed for this patient yet.
            </div>
          ) : (
            medicalRecords.map((rec) => (
              <div key={rec.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" />
                    <h4 className="font-bold text-slate-900 text-base">{rec.diagnosis}</h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{rec.recordDate}</span>
                </div>
                {rec.symptoms && (
                  <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Symptoms:</span> {rec.symptoms}</p>
                )}
                {rec.treatmentPlan && (
                  <p className="text-xs text-slate-600"><span className="font-semibold text-slate-800">Treatment Plan:</span> {rec.treatmentPlan}</p>
                )}
                {rec.labResults && (
                  <p className="text-xs text-teal-700 bg-teal-50 p-2.5 rounded-xl border border-teal-100"><span className="font-semibold text-teal-900">Lab Results:</span> {rec.labResults}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="space-y-3">
          {appointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
              No appointments scheduled for this patient.
            </div>
          ) : (
            appointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">{apt.reasonForVisit || 'General Consultation'}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Doctor: {apt.doctorName} • Time: {apt.appointmentTime}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 rounded-full">{apt.status}</span>
                  <span className="text-xs text-slate-500 font-medium">{apt.appointmentDate}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'prescriptions' && (
        <div className="space-y-3">
          {prescriptions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
              No active prescriptions filed for this patient.
            </div>
          ) : (
            prescriptions.map((rx) => (
              <div key={rx.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-teal-600" />
                    <h4 className="font-bold text-slate-800 text-sm">{rx.medications}</h4>
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                    {rx.duration || 'Active'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{rx.dosageInstructions}</p>
                <p className="text-[11px] text-slate-400 pt-1">Issued: {rx.issueDate} • By: {rx.doctorName}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
