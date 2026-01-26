
export enum RegistrationStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export interface AccompanyingMember {
  name: string;
  age: number;
}

export interface Feedback {
  rating: number;
  tags: string[];
  comment: string;
  socialHandle: string;
}

export interface CarnivalZoneProgress {
  zoneId: string;
  status: 'NONE' | 'ATTEMPTED' | 'PARTIAL' | 'COMPLETED';
  points: number;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleModel: string;
  vehicleRegNo: string;
  rcFile?: string;
  members: AccompanyingMember[];
  paymentStatus: RegistrationStatus;
  registrationDate: string;
  points: number;
  team: 'Red' | 'Green' | null;
  isCheckedIn: boolean;
  journeyStep: number;
  feedback?: Feedback;
  overallEventFeedback?: string;
  carnivalProgress: CarnivalZoneProgress[];
}

export enum Page {
  LANDING = 'LANDING',
  REGISTRATION = 'REGISTRATION',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',
  USER_PROFILE = 'USER_PROFILE',
  TICKET = 'TICKET',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD',
  RIDDLE_RUSH = 'RIDDLE_RUSH',
  CARNIVAL_JOURNEY = 'CARNIVAL_JOURNEY',
  THANK_YOU = 'THANK_YOU'
}
