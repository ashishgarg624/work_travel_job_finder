export interface Job {
  companyId: string;
  email: string;
  state: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  latitude: number;
  longitude: number;
  industry: string;
}

export interface FilterState {
  state: string;
  industry: string;
  searchTerm: string;
}
