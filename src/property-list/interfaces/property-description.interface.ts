export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface PropertyDescription {
  id: number;
  price: string;
  beds: number;
  baths: number;
  square_feet: number;
  address: Address;
  property_type: string;
  upvote: number;
  downvote: number;
  latitude: number;
  longitude: number;
}

export interface PropertyDetails {
  price: string;
  beds: number;
  baths: number;
  square_feet: number;
  description: string;
  address: Address;
  id: number;
  sold_date: Date;
  property_type: string;
  lot_size: number;
  year_built: number;
  days_on_market: number;
  monthly_hoa: number;
  mls_number: number;
  identifier: string;
  latitude: number;
  longitude: number;
  upvote: number;
  downvote: number;
}
