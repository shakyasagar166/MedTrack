import React, { useState, useEffect } from 'react';
import { FileText, Plus, Search, Calendar, User, Stethoscope, Activity, X } from 'lucide-react';
import medicalRecordService from '../services/medicalRecordService';
import patientService from '../services/patientService';
import doctorService from '../services/doctorService';

export const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    recordDate: new Date().toISOString().split('T')[0],
    diagnosis: '',
    symptoms: '',
    treatmentPlan: '',
    labResults: '',
    notes: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [recs, pats, docs] = await Promise.all([
        medicalRecordService.getAll(),
        patientService.getAll(),
        doctorService.getAll()
      ]);
      setRecords(recs);
      setPatients(pats);
      setDoctors(docs);
      if (pats.length > 0 && !formData.patientId) {
        setFormData((prev) => ({ ...prev, patientId: pats[0].id, doctorId: docs[0]?.id || '' }));
      }
    } catch (err) {
      console.error('Failed to load records', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (e) => {
    e.preventDefault();
    try {
      await medicalRecordService.create({
        ...formData,
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId)
      });
      setShowAddModal(false);
      const updated = await medicalRecordService.getAll();
      setRecords(updated);
      setFormData({
        patientId: patients[0]?.id || '',
        doctorId: doctors[0]?.id || '',
        recordDate: new Date().toISOString().split('T')[0],
        diagnosis: '',
        symptoms: '',
        treatmentPlan: '',
        labResults: '',
        notes: ''
      });
    } catch (err) {
      alert('Error creating record: ' + (err.response?.data?.message || err.message));
    }
  };

  const filteredRecords = records.filter((r) =>
    r.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
    r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
    r.doctorName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Electronic Medical Records (EMR)</h1>
          <p className="text-sm text-slate-500">Document and access patient diagnoses, clinical notes, and tests</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-teal-600/20 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Medical Record
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search records by diagnosis or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Total Records: <span className="text-slate-800 font-bold">{filteredRecords.length}</span>
        </div>
      </div>

      {/* Records List */}
      {loading ? (
        <div className="p-12 text-center">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-slate-500">Loading medical records...</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No medical records found</h3>
          <p className="text-sm text-slate-400 mt-1">Start by filing a record for an admitted patient.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center font-bold">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{record.diagnosis}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <User className="w-3.5 h-3.5 text-teal-600" />
                        {record.patientName || `Patient #${record.patientId}`}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Stethoscope className="w-3.5 h-3.5 text-slate-400" />
                        {record.doctorName || `Doctor #${record.doctorId}`}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {record.recordDate}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {record.symptoms && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">Symptoms & Complaints:</span>
                    <p className="text-slate-600">{record.symptoms}</p>
                  </div>
                )}
                {record.treatmentPlan && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">Prescribed Treatment Plan:</span>
                    <p className="text-slate-600">{record.treatmentPlan}</p>
                  </div>
                )}
              </div>

              {record.labResults && (
                <div className="mt-3 bg-teal-50/60 p-3 rounded-xl border border-teal-100 text-xs">
                  <span className="font-bold text-teal-900 block mb-1">Laboratory & Diagnostic Results:</span>
                  <p className="text-teal-800">{record.labResults}</p>
                </div>
              )}

              {record.notes && (
                <p className="mt-3 text-xs text-slate-500 italic">
                  Note: {record.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800">Add Electronic Medical Record</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecord} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Patient *</label>
                  <select
                    required
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  >
                    <option value="">Select patient...</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>{p.firstName} {p.lastName}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Physician *</label>
                  <select
                    required
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  >
                    <option value="">Select doctor...</option>
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Diagnosis *</label>
                  <input
                    type="text"
                    required
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                    placeholder="e.g. Acute Bronchitis"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Record Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.recordDate}
                    onChange={(e) => setFormData({ ...formData, recordDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Symptoms</label>
                <textarea
                  rows="2"
                  value={formData.symptoms}
                  onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                  placeholder="Patient presented with cough, fever..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Treatment Plan</label>
                <textarea
                  rows="2"
                  value={formData.treatmentPlan}
                  onChange={(e) => setFormData({ ...formData, treatmentPlan: e.target.value })}
                  placeholder="Prescription and recommended lifestyle alterations..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Diagnostic / Lab Results</label>
                <input
                  type="text"
                  value={formData.labResults}
                  onChange={(e) => setFormData({ ...formData, labResults: e.target.value })}
                  placeholder="e.g. WBC: 11,200, Chest X-ray clear"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-md shadow-teal-600/20"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
