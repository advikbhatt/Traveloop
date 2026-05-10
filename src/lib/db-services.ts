import { collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './firebase';

export interface Trip {
  id: string;
  name: string;
  dates: string;
  destinationCount: number;
  status: 'upcoming' | 'planning' | 'past';
  coverPhoto: string;
  userId: string;
}

export interface Stop {
  id: string;
  tripId: string;
  city: string;
  country: string;
  dates: string;
  order: number;
}

export interface Activity {
  id: string;
  stopId: string;
  name: string;
  type: string;
  duration: string;
  cost: string;
}

// Fetch all trips for a user
export async function getUserTrips(userId: string = "mock-user-id"): Promise<Trip[]> {
  try {
    const q = query(collection(db, "trips"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const trips: Trip[] = [];
    querySnapshot.forEach((doc) => {
      trips.push({ id: doc.id, ...doc.data() } as Trip);
    });
    return trips;
  } catch (error) {
    console.error("Error fetching trips:", error);
    return [];
  }
}

// Add a new trip
export async function createTrip(tripData: Omit<Trip, "id">): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "trips"), tripData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding trip:", error);
    return null;
  }
}

// Get a single trip
export async function getTripById(id: string): Promise<Trip | null> {
  try {
    const docSnap = await getDoc(doc(db, "trips", id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Trip;
    }
    return null;
  } catch (error) {
    console.error("Error fetching trip:", error);
    return null;
  }
}

// Get stops for a trip
export async function getStopsForTrip(tripId: string): Promise<Stop[]> {
  try {
    const q = query(collection(db, "stops"), where("tripId", "==", tripId));
    const querySnapshot = await getDocs(q);
    const stops: Stop[] = [];
    querySnapshot.forEach((doc) => {
      stops.push({ id: doc.id, ...doc.data() } as Stop);
    });
    return stops.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching stops:", error);
    return [];
  }
}

// Add a stop
export async function addStop(stopData: Omit<Stop, "id">): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "stops"), stopData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding stop:", error);
    return null;
  }
}

// Get activities for a stop
export async function getActivitiesForStop(stopId: string): Promise<Activity[]> {
  try {
    const q = query(collection(db, "activities"), where("stopId", "==", stopId));
    const querySnapshot = await getDocs(q);
    const activities: Activity[] = [];
    querySnapshot.forEach((doc) => {
      activities.push({ id: doc.id, ...doc.data() } as Activity);
    });
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
}

// Add an activity
export async function addActivity(activityData: Omit<Activity, "id">): Promise<string | null> {
  try {
    const docRef = await addDoc(collection(db, "activities"), activityData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding activity:", error);
    return null;
  }
}
