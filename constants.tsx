
import { Attendee, RegistrationStatus } from './types';

export const INITIAL_ATTENDEES: Attendee[] = [
  {
    id: 'HYU-001',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '9876543210',
    vehicleModel: 'Hyundai Creta',
    vehicleRegNo: 'DL 1C AB 1234',
    members: [{ name: 'Anjali Sharma', age: 32 }, { name: 'Ishaan Sharma', age: 8 }],
    paymentStatus: RegistrationStatus.VERIFIED,
    registrationDate: '2025-10-15',
    points: 125,
    team: 'Red',
    // Fix: Add missing required property isCheckedIn
    isCheckedIn: false,
    // Fix: Add missing required property journeyStep
    journeyStep: 0,
    // Fix: Add missing required property carnivalProgress
    carnivalProgress: [
      { zoneId: 'Z1', status: 'NONE', points: 0 },
      { zoneId: 'Z2', status: 'NONE', points: 0 },
      { zoneId: 'Z3', status: 'NONE', points: 0 },
      { zoneId: 'Z4', status: 'NONE', points: 0 },
      { zoneId: 'Z5', status: 'NONE', points: 0 }
    ]
  },
  {
    id: 'HYU-002',
    name: 'Priya Verma',
    email: 'priya.v@example.com',
    phone: '9812345678',
    vehicleModel: 'Hyundai Verna',
    vehicleRegNo: 'UP 32 XY 5678',
    members: [{ name: 'Sanjay Verma', age: 35 }],
    paymentStatus: RegistrationStatus.PAID,
    registrationDate: '2025-11-02',
    points: 0,
    team: 'Green',
    // Fix: Add missing required property isCheckedIn
    isCheckedIn: false,
    // Fix: Add missing required property journeyStep
    journeyStep: 0,
    // Fix: Add missing required property carnivalProgress
    carnivalProgress: [
      { zoneId: 'Z1', status: 'NONE', points: 0 },
      { zoneId: 'Z2', status: 'NONE', points: 0 },
      { zoneId: 'Z3', status: 'NONE', points: 0 },
      { zoneId: 'Z4', status: 'NONE', points: 0 },
      { zoneId: 'Z5', status: 'NONE', points: 0 }
    ]
  }
];

export const EVENT_DETAILS = {
  name: "Hyundai Explorers Carnival 2026",
  city: "Lucknow",
  venue: "The Centrum, Lucknow",
  date: "Saturday, 28th Feb 2026",
  registrationTime: "2:30 PM",
  briefingTime: "3:30 PM",
  flagOffTime: "5:00 PM",
  fee: 999
};
