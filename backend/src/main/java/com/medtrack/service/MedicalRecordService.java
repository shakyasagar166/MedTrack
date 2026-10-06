package com.medtrack.service;

import com.medtrack.dto.MedicalRecordDTO;
import com.medtrack.entity.Appointment;
import com.medtrack.entity.Doctor;
import com.medtrack.entity.MedicalRecord;
import com.medtrack.entity.Patient;
import com.medtrack.exception.ResourceNotFoundException;
import com.medtrack.repository.AppointmentRepository;
import com.medtrack.repository.DoctorRepository;
import com.medtrack.repository.MedicalRecordRepository;
import com.medtrack.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalRecordService {

    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;

    public MedicalRecordService(
            MedicalRecordRepository medicalRecordRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AppointmentRepository appointmentRepository
    ) {
        this.medicalRecordRepository = medicalRecordRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<MedicalRecordDTO> getAllMedicalRecords() {
        return medicalRecordRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public MedicalRecordDTO getRecordById(Long id) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found with id: " + id));
        return toDTO(record);
    }

    public List<MedicalRecordDTO> getRecordsByPatient(Long patientId) {
        return medicalRecordRepository.findByPatientId(patientId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<MedicalRecordDTO> getRecordsByDoctor(Long doctorId) {
        return medicalRecordRepository.findByDoctorId(doctorId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public MedicalRecordDTO createRecord(MedicalRecordDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + dto.getPatientId()));
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + dto.getDoctorId()));

        MedicalRecord record = new MedicalRecord();
        record.setPatient(patient);
        record.setDoctor(doctor);
        record.setRecordDate(dto.getRecordDate());
        record.setDiagnosis(dto.getDiagnosis());
        record.setSymptoms(dto.getSymptoms());
        record.setTreatmentPlan(dto.getTreatmentPlan());
        record.setLabResults(dto.getLabResults());
        record.setNotes(dto.getNotes());

        if (dto.getAppointmentId() != null) {
            Appointment appointment = appointmentRepository.findById(dto.getAppointmentId()).orElse(null);
            record.setAppointment(appointment);
        }

        MedicalRecord saved = medicalRecordRepository.save(record);
        return toDTO(saved);
    }

    @Transactional
    public MedicalRecordDTO updateRecord(Long id, MedicalRecordDTO dto) {
        MedicalRecord record = medicalRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Medical record not found with id: " + id));

        record.setDiagnosis(dto.getDiagnosis());
        record.setSymptoms(dto.getSymptoms());
        record.setTreatmentPlan(dto.getTreatmentPlan());
        record.setLabResults(dto.getLabResults());
        record.setNotes(dto.getNotes());
        if (dto.getRecordDate() != null) {
            record.setRecordDate(dto.getRecordDate());
        }

        MedicalRecord updated = medicalRecordRepository.save(record);
        return toDTO(updated);
    }

    @Transactional
    public void deleteRecord(Long id) {
        if (!medicalRecordRepository.existsById(id)) {
            throw new ResourceNotFoundException("Medical record not found with id: " + id);
        }
        medicalRecordRepository.deleteById(id);
    }

    public MedicalRecordDTO toDTO(MedicalRecord record) {
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setId(record.getId());
        dto.setPatientId(record.getPatient().getId());
        dto.setPatientName(record.getPatient().getFirstName() + " " + record.getPatient().getLastName());
        dto.setDoctorId(record.getDoctor().getId());
        dto.setDoctorName(record.getDoctor().getFullName());
        if (record.getAppointment() != null) {
            dto.setAppointmentId(record.getAppointment().getId());
        }
        dto.setRecordDate(record.getRecordDate());
        dto.setDiagnosis(record.getDiagnosis());
        dto.setSymptoms(record.getSymptoms());
        dto.setTreatmentPlan(record.getTreatmentPlan());
        dto.setLabResults(record.getLabResults());
        dto.setNotes(record.getNotes());
        return dto;
    }
}
