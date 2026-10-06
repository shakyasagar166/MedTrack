package com.medtrack.service;

import com.medtrack.dto.PrescriptionDTO;
import com.medtrack.entity.Doctor;
import com.medtrack.entity.MedicalRecord;
import com.medtrack.entity.Patient;
import com.medtrack.entity.Prescription;
import com.medtrack.exception.ResourceNotFoundException;
import com.medtrack.repository.DoctorRepository;
import com.medtrack.repository.MedicalRecordRepository;
import com.medtrack.repository.PatientRepository;
import com.medtrack.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final MedicalRecordRepository medicalRecordRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            MedicalRecordRepository medicalRecordRepository
    ) {
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.medicalRecordRepository = medicalRecordRepository;
    }

    public List<PrescriptionDTO> getAllPrescriptions() {
        return prescriptionRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PrescriptionDTO getPrescriptionById(Long id) {
        Prescription rx = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));
        return toDTO(rx);
    }

    public List<PrescriptionDTO> getPrescriptionsByPatient(Long patientId) {
        return prescriptionRepository.findByPatientId(patientId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<PrescriptionDTO> getPrescriptionsByDoctor(Long doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Transactional
    public PrescriptionDTO createPrescription(PrescriptionDTO dto) {
        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + dto.getPatientId()));
        Doctor doctor = doctorRepository.findById(dto.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + dto.getDoctorId()));

        Prescription rx = new Prescription();
        rx.setPatient(patient);
        rx.setDoctor(doctor);
        rx.setIssueDate(dto.getIssueDate());
        rx.setMedications(dto.getMedications());
        rx.setDosageInstructions(dto.getDosageInstructions());
        rx.setDuration(dto.getDuration());
        rx.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");

        if (dto.getMedicalRecordId() != null) {
            MedicalRecord record = medicalRecordRepository.findById(dto.getMedicalRecordId()).orElse(null);
            rx.setMedicalRecord(record);
        }

        Prescription saved = prescriptionRepository.save(rx);
        return toDTO(saved);
    }

    @Transactional
    public PrescriptionDTO updatePrescriptionStatus(Long id, String status) {
        Prescription rx = prescriptionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Prescription not found with id: " + id));
        rx.setStatus(status.toUpperCase());
        Prescription updated = prescriptionRepository.save(rx);
        return toDTO(updated);
    }

    @Transactional
    public void deletePrescription(Long id) {
        if (!prescriptionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Prescription not found with id: " + id);
        }
        prescriptionRepository.deleteById(id);
    }

    public PrescriptionDTO toDTO(Prescription rx) {
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setId(rx.getId());
        dto.setPatientId(rx.getPatient().getId());
        dto.setPatientName(rx.getPatient().getFirstName() + " " + rx.getPatient().getLastName());
        dto.setDoctorId(rx.getDoctor().getId());
        dto.setDoctorName(rx.getDoctor().getFullName());
        if (rx.getMedicalRecord() != null) {
            dto.setMedicalRecordId(rx.getMedicalRecord().getId());
        }
        dto.setIssueDate(rx.getIssueDate());
        dto.setMedications(rx.getMedications());
        dto.setDosageInstructions(rx.getDosageInstructions());
        dto.setDuration(rx.getDuration());
        dto.setStatus(rx.getStatus());
        return dto;
    }
}
