package com.medtrack.service;

import com.medtrack.dto.DoctorDTO;
import com.medtrack.entity.Doctor;
import com.medtrack.exception.ResourceNotFoundException;
import com.medtrack.repository.DoctorRepository;
import com.medtrack.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    public DoctorService(DoctorRepository doctorRepository, UserRepository userRepository) {
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
    }

    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));
        return toDTO(doctor);
    }

    @Transactional
    public DoctorDTO createDoctor(DoctorDTO dto) {
        if (doctorRepository.existsByLicenseNumber(dto.getLicenseNumber())) {
            throw new IllegalArgumentException("License number already exists: " + dto.getLicenseNumber());
        }

        Doctor doctor = new Doctor();
        copyProperties(dto, doctor);

        if (dto.getUserId() != null) {
            userRepository.findById(dto.getUserId()).ifPresent(doctor::setUser);
        }

        Doctor saved = doctorRepository.save(doctor);
        return toDTO(saved);
    }

    @Transactional
    public DoctorDTO updateDoctor(Long id, DoctorDTO dto) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor not found with id: " + id));

        copyProperties(dto, doctor);

        if (dto.getUserId() != null) {
            userRepository.findById(dto.getUserId()).ifPresent(doctor::setUser);
        }

        Doctor updated = doctorRepository.save(doctor);
        return toDTO(updated);
    }

    @Transactional
    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Doctor not found with id: " + id);
        }
        doctorRepository.deleteById(id);
    }

    private void copyProperties(DoctorDTO dto, Doctor doctor) {
        doctor.setFullName(dto.getFullName());
        doctor.setEmail(dto.getEmail());
        doctor.setPhone(dto.getPhone());
        doctor.setSpecialization(dto.getSpecialization());
        doctor.setLicenseNumber(dto.getLicenseNumber());
        doctor.setQualification(dto.getQualification());
        doctor.setExperienceYears(dto.getExperienceYears());
        doctor.setConsultationFee(dto.getConsultationFee());
        doctor.setDepartment(dto.getDepartment());
        doctor.setAvailableDays(dto.getAvailableDays());
        doctor.setAvailableTime(dto.getAvailableTime());
    }

    public DoctorDTO toDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        if (doctor.getUser() != null) {
            dto.setUserId(doctor.getUser().getId());
        }
        dto.setFullName(doctor.getFullName());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setLicenseNumber(doctor.getLicenseNumber());
        dto.setQualification(doctor.getQualification());
        dto.setExperienceYears(doctor.getExperienceYears());
        dto.setConsultationFee(doctor.getConsultationFee());
        dto.setDepartment(doctor.getDepartment());
        dto.setAvailableDays(doctor.getAvailableDays());
        dto.setAvailableTime(doctor.getAvailableTime());
        return dto;
    }
}
