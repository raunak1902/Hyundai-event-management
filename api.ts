
import { Attendee, RegistrationStatus, Feedback, CarnivalZoneProgress } from './types';
import { INITIAL_ATTENDEES } from './constants';

const DB_KEY = 'hyundai_carnival_db';

const CARNIVAL_ZONES = [
  { id: 'Z1', name: 'Adventure Arena' },
  { id: 'Z2', name: 'Tech Innovation Hub' },
  { id: 'Z3', name: 'Heritage Gallery' },
  { id: 'Z4', name: 'Kids Fun Zone' },
  { id: 'Z5', name: 'Culinary Street' }
];

const getDb = (): Attendee[] => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    return INITIAL_ATTENDEES.map(a => ({
      ...a,
      isCheckedIn: a.isCheckedIn || false,
      journeyStep: a.journeyStep || 0,
      points: a.points || 0,
      carnivalProgress: CARNIVAL_ZONES.map(z => ({ zoneId: z.id, status: 'NONE', points: 0 }))
    }));
  }
  return JSON.parse(data);
};

const saveDb = (data: Attendee[]) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const api = {
  getAttendees: async (): Promise<Attendee[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getDb()), 300);
    });
  },

  register: async (attendee: Omit<Attendee, 'id' | 'registrationDate' | 'points' | 'team' | 'isCheckedIn' | 'journeyStep' | 'carnivalProgress'>): Promise<Attendee> => {
    return new Promise((resolve) => {
      const db = getDb();
      const newAttendee: Attendee = {
        ...attendee,
        id: `HYU-${Math.floor(1000 + Math.random() * 9000)}`,
        registrationDate: new Date().toISOString().split('T')[0],
        points: 0,
        team: Math.random() > 0.5 ? 'Red' : 'Green',
        isCheckedIn: false,
        journeyStep: 0,
        carnivalProgress: CARNIVAL_ZONES.map(z => ({ zoneId: z.id, status: 'NONE', points: 0 }))
      };
      db.push(newAttendee);
      saveDb(db);
      setTimeout(() => resolve(newAttendee), 500);
    });
  },

  updateStatus: async (id: string, status: RegistrationStatus): Promise<boolean> => {
    const db = getDb();
    const index = db.findIndex(a => a.id === id);
    if (index !== -1) {
      db[index].paymentStatus = status;
      saveDb(db);
      return true;
    }
    return false;
  },

  checkIn: async (id: string): Promise<boolean> => {
    const db = getDb();
    const index = db.findIndex(a => a.id === id);
    if (index !== -1) {
      db[index].isCheckedIn = true;
      saveDb(db);
      return true;
    }
    return false;
  },

  updateJourney: async (id: string, step: number, pointsToAdd: number, feedback?: Feedback): Promise<boolean> => {
    const db = getDb();
    const index = db.findIndex(a => a.id === id);
    if (index !== -1) {
      db[index].journeyStep = step;
      db[index].points += pointsToAdd;
      if (feedback) db[index].feedback = feedback;
      saveDb(db);
      return true;
    }
    return false;
  },

  updateZoneProgress: async (userId: string, zoneId: string, status: CarnivalZoneProgress['status'], points: number): Promise<boolean> => {
    const db = getDb();
    const index = db.findIndex(a => a.id === userId);
    if (index !== -1) {
      const zoneIndex = db[index].carnivalProgress.findIndex(z => z.zoneId === zoneId);
      if (zoneIndex !== -1) {
        const oldPoints = db[index].carnivalProgress[zoneIndex].points;
        db[index].carnivalProgress[zoneIndex].status = status;
        db[index].carnivalProgress[zoneIndex].points = points;
        db[index].points = (db[index].points - oldPoints) + points;
        saveDb(db);
        return true;
      }
    }
    return false;
  },

  updateOverallFeedback: async (id: string, comment: string): Promise<boolean> => {
    const db = getDb();
    const index = db.findIndex(a => a.id === id);
    if (index !== -1) {
      db[index].overallEventFeedback = comment;
      saveDb(db);
      return true;
    }
    return false;
  }
};
