export type UserRole =
  | "DOCTOR"
  | "TECHNICIAN"
  | "PHARMACIST"
  | "NURSE"
  | "FRONT_DESK"
  | "STAFF";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type DepartmentType = "EXAMINATION" | "LAB" | "SCAN" | "PHARMACY";
export type TestType = "LAB" | "SCAN";
export type roomStatus = "AVAILABLE" | "BUSY";
export type appointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";
export type examinationStatus = "OPEN" | "WAITING_RESULT" | "COMPLETED";
export type testRequestStatus =
  | "PENDING"
  | "ACCEPTED"
  | "PROCESSING"
  | "COMPLETED";
export type prescriptionStatus = "PENDING" | "PROCESSING" | "COMPLETED";
export type medicalDocumentType = "REPORT" | "IMAGE" | "REFERRAL" | "OTHER";

export interface User {
  id: string;
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  gender?: Gender;
  dateOfBirth?: Date;

  profileImage?: string;

  // Contact Information
  email?: string;
  phone: string;
  alternativePhone?: string;
  address?: string;

  // Role & Organization
  role: UserRole;
  departmentId?: string;
  employeeId?: string;

  // Professional Information
  specialization?: string;
  education?: string;
  licenseNumber?: string; // Doctor/Nurse/Pharmacist license
  licenseExpiryDate?: Date;

  experienceYears?: number;
  joiningDate?: Date;

  // Emergency / Personal Info
  emergencyContactName?: string;
  emergencyContactPhone?: string;

  note?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;

  cardNumber: string;
  firstName: string;
  lastName: string;

  gender: Gender;
  dateOfBirth: Date;

  phone: string;
  address?: string;

  bloodGroup?: string;

  // Emergency / Personal Info
  emergencyContactName?: string;
  emergencyContactPhone?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;

  name: string;
  type: DepartmentType;
  description?: string;

  createdAt: Date;
}

export interface Room {
  id: string;

  name: string;
  departmentId: string;
  capacity?: number;

  status: roomStatus;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: Date;
  reason?: string;
  status: appointmentStatus;

  createdAt: Date;
}

export interface Examination {
  id: string;

  patientId: string;
  doctorId: string;

  title: string;
  departmentId: string;

  symptoms?: string;
  diagnosis?: string;
  notes?: string;

  status: examinationStatus;

  followUpDate?: Date;

  createdAt: Date;
}

export interface TestRequest {
  id: string;

  examinationId: string;
  testType: TestType;

  title: string;
  description?: string;

  status: testRequestStatus;

  result?: string;
  technicianId?: string;

  createdAt: Date;
}

export interface Prescription {
  id: string;

  examinationId: string;

  doctorId: string;
  patientId: string;

  pharmacistId?: string;

  medicines: {
    name: string;
    dosage: string;
    quantity: number;
    instruction: string;
  }[];

  status: prescriptionStatus;

  note?: string;

  createdAt: Date;
}

export interface MedicalDocument {
  id: string;

  patientId: string;
  uploadedBy: string;

  type: medicalDocumentType;
  description?: string;
  fileUrl: string;

  createdAt: Date;
}
