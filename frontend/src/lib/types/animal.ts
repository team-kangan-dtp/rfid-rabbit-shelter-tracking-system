/**
 * Core Animal type definition
 */
export interface Animal {
  id: string;
  name: string;
  species: string;
  breed?: string;
  date_of_birth?: string;
  fur_colour?: string;
  weight_kg?: number;
  arrival_date: string;
  neutered: boolean;
  adoption_status: string;
  bonded_with?: string;
  rfid_tag?: string;
  special_needs?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Animal form data for creating new animals
 */
export interface AnimalCreateData {
  name: string;
  species: string;
  breed?: string;
  date_of_birth?: string;
  fur_colour?: string;
  weight_kg?: string | number;
  arrival_date: string;
  neutered: boolean;
  adoption_status: string;
  bonded_with?: string;
  rfid_tag?: string;
  special_needs?: string;
  description?: string;
}

/**
 * Animal form data for updating existing animals
 */
export interface AnimalUpdateData extends AnimalCreateData {
  id: string;
}

/**
 * Available animal species options
 */
export const ANIMAL_SPECIES = [
  "Rabbit",
  "Dog", 
  "Cat",
  "Guinea Pig",
  "Bird",
  "Other"
] as const;

/**
 * Available adoption status options
 */
export const ADOPTION_STATUSES = [
  "Available",
  "Pending", 
  "Adopted",
  "Hold",
  "Medical Hold",
  "Not Available"
] as const;

/**
 * Animal species type
 */
export type AnimalSpecies = typeof ANIMAL_SPECIES[number];

/**
 * Adoption status type
 */
export type AdoptionStatus = typeof ADOPTION_STATUSES[number];

/**
 * Animal filter options
 */
export interface AnimalFilters {
  searchTerm: string;
  species: string;
  adoptionStatus: string;
  neutered: string;
  dateFrom: string;
  dateTo: string;
}

/**
 * Modal modes for animal operations
 */
export type AnimalModalMode = "view" | "edit";

/**
 * Form field types supported by AnimalFormField
 */
export type FormFieldType = "text" | "date" | "number" | "select" | "textarea" | "checkbox";

/**
 * Animal event handlers
 */
export interface AnimalEventHandlers {
  onView?: (animal: Animal) => void;
  onEdit?: (animal: Animal) => void;
  onDelete?: (animal: Animal) => void;
}