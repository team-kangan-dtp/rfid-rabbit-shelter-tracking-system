import type { Animal } from './animal';

/**
 * Utility type for partial animal updates (for form validation)
 */
export type PartialAnimal = Partial<Animal>;

/**
 * Required fields for animal creation
 */
export type RequiredAnimalFields = Pick<Animal, 'name' | 'species' | 'arrival_date' | 'neutered' | 'adoption_status'>;

/**
 * Optional fields for animal creation
 */
export type OptionalAnimalFields = Omit<Animal, keyof RequiredAnimalFields | 'id' | 'created_at' | 'updated_at'>;

/**
 * Animal display fields (for tables and cards)
 */
export type AnimalDisplayFields = Pick<Animal, 'id' | 'name' | 'species' | 'date_of_birth' | 'adoption_status'>;

/**
 * Animal search fields (for filtering)
 */
export type AnimalSearchFields = Pick<Animal, 'name' | 'species' | 'breed'>;

/**
 * Utility function type for animal array operations
 */
export type AnimalArrayProcessor<T = Animal[]> = (animals: Animal[]) => T;

/**
 * Animal field validation result
 */
export interface FieldValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Animal form validation result
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Sort options for animal lists
 */
export type AnimalSortField = keyof Pick<Animal, 'name' | 'species' | 'arrival_date' | 'adoption_status'>;
export type SortDirection = 'asc' | 'desc';

export interface AnimalSortOptions {
  field: AnimalSortField;
  direction: SortDirection;
}