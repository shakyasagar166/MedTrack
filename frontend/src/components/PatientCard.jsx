import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Droplets, AlertTriangle, ChevronRight, User } from 'lucide-react';

export const PatientCard = ({ patient, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all hover:border-teal-300 group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg group-hover:bg-teal-600 group-hover:text-white transition-colors">
            {patient.firstName ? patient.firstName.charAt(0) : <User className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
              {patient.firstName} {patient.lastName}
            </h3>
            <p className="text-xs text-slate-500">ID: #{patient.id} • {patient.gender || 'Not specified'}</p>
          </div>
        </div>

        {patient.bloodGroup && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-100">
            <Droplets className="w-3 h-3 text-rose-500" />
            {patient.bloodGroup}
          </span>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2 text-xs">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{patient.phone}</span>
        </div>
        {patient.email && (
          <div className="flex items-center gap-2 text-xs">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{patient.email}</span>
          </div>
        )}
        {patient.allergies && (
          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-md">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">Allergies: {patient.allergies}</span>
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
        <Link
          to={`/patients/${patient.id}`}
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          View Medical File
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(patient.id)}
            className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
