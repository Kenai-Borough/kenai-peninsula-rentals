export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  created_at: string;
}

export interface RentalListing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  monthly_rent: number;
  
  property_type: 'apartment' | 'house' | 'condo' | 'room' | 'cabin' | 'other';
  bedrooms: number;
  bathrooms: number;
  square_feet?: number;
  
  lease_term: 'month-to-month' | '6-month' | '1-year' | 'flexible';
  available_date: string;
  security_deposit: number;
  first_last_required: boolean;
  
  utilities_included: string[];
  
  pets_allowed: boolean;
  pet_deposit?: number;
  pet_restrictions?: string;
  
  furnished: boolean;
  parking_spaces: number;
  laundry: 'in-unit' | 'shared' | 'none';
  heating_type: string;
  
  location: string;
  neighborhood?: string;
  latitude?: number;
  longitude?: number;
  
  images: string[];
  video_url?: string;
  virtual_tour_url?: string;
  
  status: 'pending' | 'active' | 'rented' | 'expired';
  payment_status: 'unpaid' | 'paid';
  featured: boolean;
  featured_until?: string;
  
  views: number;
  created_at: string;
  updated_at: string;
  expires_at: string;
  
  user?: User;
}

export interface PaymentIntent {
  id: string;
  user_id: string;
  listing_id?: string;
  amount: number;
  type: 'listing' | 'featured';
  stripe_payment_id?: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface Message {
  id: string;
  listing_id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface SearchFilters {
  minRent?: number;
  maxRent?: number;
  propertyType?: string[];
  minBedrooms?: number;
  minBathrooms?: number;
  petsAllowed?: boolean;
  leaseTerm?: string;
  location?: string;
  sortBy?: 'rent_asc' | 'rent_desc' | 'bedrooms_desc' | 'newest';
}
