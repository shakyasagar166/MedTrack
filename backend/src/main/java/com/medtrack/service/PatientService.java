package com.medtrack.service;

import com.medtrack.dto.PatientDTO;
import com.medtrack.entity.Patient;
import com.medtrack.exception.ResourceNotFoundException;
import com.medtrack.repository.PatientRepository;
import com.medtrack.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public PatientService(PatientRepository patientRepository, UserRepository userRepository) {
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    public List<PatientDTO> getAllPatients(String search) {
        List<Patient> patients;
        if (search != null && !search.trim().isEmpty()) {
            patients = patientRepository.searchPatients(search.trim());
        } else {
            patients = patientRepository.findAll();
        }
        return patients.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));
        return toDTO(patient);
    }

    @Transactional
    public PatientDTO createPatient(PatientDTO dto) {
        Patient patient = new Patient();
        copyProperties(dto, patient);

        if (dto.getUserId() != null) {
            userRepository.findById(dto.getUserId()).ifPresent(patient::setUser);
        }

        Patient saved = patientRepository.save(patient);
        return toDTO(saved);
    }

    @Transactional
    public PatientDTO updatePatient(Long id, PatientDTO dto) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Patient not found with id: " + id));

        copyProperties(dto, patient);

        if (dto.getUserId() != null) {
            userRepository.findById(dto.getUserId()).ifPresent(patient::setUser);
        }

        Patient updated = patientRepository.save(patient);
        return toDTO(updated);
    }

    @Transactional
    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

    private void copyProperties(PatientDTO dto, Patient patient) {
        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setEmail(dto.getEmail());
        patient.setPhone(dto.getPhone());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setGender(dto.getGender());
        patient.setBloodGroup(dto.getBloodGroup());
        patient.setAddress(dto.getAddress());
        patient.setEmergencyContactName(dto.getEmergencyContactName());
        patient.setEmergencyContactPhone(dto.getEmergencyContactPhone());
        patient.setAllergies(dto.getAllergies());
        patient.setMedicalHistory(dto.getMedicalHistory());
    }

    public PatientDTO toDTO(Patient patient) {
        PatientDTO dto = new PatientDTO();
        dto.setId(patient.getId());
        if (patient.getUser() != null) {
            dto.setUserId(patient.getUser().getId());
        }
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmail());
        dto.setPhone(patient.getPhone());
        dto.setDateOfBirth(patient.getDateOfBirth());
        dto.setGender(patient.getGender());
        dto.setBloodGroup(patient.getBloodGroup());
        dto.setAddress(patient.getAddress());
        dto.setEmergencyContactName(patient.getEmergencyContactName());
        dto.setEmergencyContactPhone(patient.getEmergencyContactPhone());
        dto.setAllergies(patient.getAllergies());
        dto.setMedicalHistory(patient.getMedicalHistory());
        return dto;
    }
}
