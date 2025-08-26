// Animal types
export type {
  Animal,
  AnimalCreateData,
  AnimalUpdateData,
  AnimalSpecies,
  AdoptionStatus,
  AnimalFilters,
  AnimalModalMode,
  FormFieldType,
  AnimalEventHandlers
} from './animal';

export {
  ANIMAL_SPECIES,
  ADOPTION_STATUSES
} from './animal';

// Utility types
export type {
  PartialAnimal,
  RequiredAnimalFields,
  OptionalAnimalFields,
  AnimalDisplayFields,
  AnimalSearchFields,
  AnimalArrayProcessor,
  FieldValidationResult,
  FormValidationResult,
  AnimalSortField,
  SortDirection,
  AnimalSortOptions
} from './utils';