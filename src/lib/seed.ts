import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function seedDummyData() {
  const tripsSnapshot = await getDocs(collection(db, "trips"));
  if (!tripsSnapshot.empty) {
    console.log("Database already seeded");
    return;
  }

  console.log("Seeding dummy data to Firebase...");

  // Add dummy trips
  const tripRef1 = await addDoc(collection(db, "trips"), {
    name: "Euro Summer 2026",
    dates: "Jun 10 - Jul 05",
    destinationCount: 4,
    status: "upcoming",
    coverPhoto: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80",
    userId: "mock-user-id"
  });

  const tripRef2 = await addDoc(collection(db, "trips"), {
    name: "Japan Autumn Trip",
    dates: "Oct 12 - Oct 26",
    destinationCount: 3,
    status: "planning",
    coverPhoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    userId: "mock-user-id"
  });

  // Add stops for trip 1
  const stopRef1 = await addDoc(collection(db, "stops"), {
    tripId: tripRef1.id,
    city: "Paris",
    country: "France",
    dates: "Jun 10 - Jun 15",
    order: 1
  });

  const stopRef2 = await addDoc(collection(db, "stops"), {
    tripId: tripRef1.id,
    city: "Lyon",
    country: "France",
    dates: "Jun 15 - Jun 18",
    order: 2
  });

  // Add activities for stop 1
  await addDoc(collection(db, "activities"), {
    stopId: stopRef1.id,
    name: "Eiffel Tower Summit",
    type: "Sightseeing",
    duration: "3 hrs",
    cost: "$35"
  });

  await addDoc(collection(db, "activities"), {
    stopId: stopRef1.id,
    name: "Louvre Museum Tour",
    type: "Culture",
    duration: "4 hrs",
    cost: "$25"
  });

  console.log("Seeding complete!");
}
