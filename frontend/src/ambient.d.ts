// Type definitions here will automatically be included in your source files
export type AdoptionStatus =
  | "Available"
  | "Pending"
  | "Adopted"
  | "Hold"
  | "Medical Hold"
  | "Not Available"
  | null;

export interface Animal {
  id: string;
  name: string;
  dateOfBirth?: Date | null;
  species: string;
  breed?: string | null;
  furColour?: string | null;
  weightKg?: number | null;
  arrivalDate: Date | null;
  neutered?: boolean | null;
  adoptionStatus?: AdoptionStatus;
  bondedWith?: string | null; // Links to other animal ID
  rfidTag?: string | null;
  specialNeeds?: string | null;
  description?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export type HealthStatus = "Excellent" | "Good" | "Fair" | "Poor" | "Critical";

export interface HealthCheck {
  id: string;
  animalId: string;
  vetId: string;
  checkDate: Date;
  checkType: string;
  weightKg?: number | null;
  temperatureCelsius?: number | null;
  heartRate?: number | null;
  examinationNotes?: string | null;
  diagnosis?: string | null;
  treatmentGiven?: string | null;
  medicationsPrescribed?: string | null;
  followUpRequired?: boolean | null;
  followUpDate?: Date | null;
  overallHealthStatus?: HealthStatus | null;
  createdAt?: Date | null;
}

export type AdoptionStatus = "Active" | "Returned" | "Cancelled";

export interface Adoption {
  id: string;
  animalId: string;
  adopterId: string;
  adoptionDate: Date;
  adoptionFee: number;
  returnDate?: Date | null;
  returnReason?: string | null;
  adoptionStatus?: AdoptionStatus | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ShiftStatus =
  | "Scheduled"
  | "In Progress"
  | "Completed"
  | "No Show"
  | "Cancelled";

export interface Shift {
  shiftId: number;
  userId: string;
  shiftType: string;
  shiftDate: Date;
  actualStart?: string | null; // "HH:mm:ss" format
  actualEnd?: string | null; // "HH:mm:ss" format
  primaryRole?: string | null;
  dutiesPerformed?: string[] | null;
  status?: ShiftStatus | null;
  notes?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface RfidLog {
  id: string;
  scanTime: Date | null;
  userId?: string | null;
  animalId?: string | null;
}

export interface user {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  dob: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  volunteerStartDate: string;
  volunteerNotes: string;
}
