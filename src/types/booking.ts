export interface Service {
  id: string;
  name: string;
  description?: string;
  duration: number; // in minutes
  price: number;
}

export interface Artist {
  id: string;
  name: string;
  imageUrl: string;
  specialties: string[];
  availability?: string[];
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface BookingFormData {
  service?: Service;
  artist?: Artist;
  date?: string;
  time?: string;
  personalInfo?: Partial<PersonalInfo>;
}

export interface ValidationErrors {
  [key: string]: string;
}
