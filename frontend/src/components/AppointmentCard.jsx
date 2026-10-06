import React from 'react';
import { Calendar, Clock, User, Stethoscope, Check, X, AlertCircle } from 'lucide-react';
import { APPOINTMENT_STATUS } from '../utils/constants';

export const AppointmentCard = ({ appointment, onStatusChange }) => {
  const statusConfig = APPOINTMENT_STATUS[appointment.status] || {
    label: appointment.status,
    color: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
            <span className="text-xs text-slate-400">ID #{appointment.id}</span>
          </div>
          <h4 className="font-semibold text-slate-900 text-base mt-2 flex items-center gap-2">
            <User className="w-4 h-4 text-teal-600" />
            {appointment.patientName || `Patient #${appointment.patientId}`}
          </h4>
        </div>

        <div className="text-right text-xs text-slate-500">
          <div className="flex items-center gap-1 font-medium text-slate-700 justify-end">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            {appointment.appointmentDate}
          </div>
          <div className="flex items-center gap-1 mt-1 justify-end">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {appointment.appointmentTime}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
          <span className="font-medium text-slate-800">
            {appointment.doctorName || `Doctor #${appointment.doctorId}`}
          </span>
          {appointment.doctorSpecialization && (
            <span className="text-xs text-slate-400">({appointment.doctorSpecialization})</span>
          )}
        </div>

        {appointment.reasonForVisit && (
          <p className="mt-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="font-semibold text-slate-700">Reason:</span> {appointment.reasonForVisit}
          </p>
        )}
      </div>

      {onStatusChange && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          {appointment.status === 'PENDING' && (
            <button
              onClick={() => onStatusChange(appointment.id, 'CONFIRMED')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Confirm
            </button>
          )}
          {(appointment.status === 'CONFIRMED' || appointment.status === 'PENDING') && (
            <button
              onClick={() => onStatusChange(appointment.id, 'COMPLETED')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              Complete
            </button>
          )}
          {appointment.status !== 'CANCELLED' && appointment.status !== 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(appointment.id, 'CANCELLED')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;
