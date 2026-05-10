import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function seedDummyData() {
  const tripsSnapshot = await getDocs(collection(db, "trips"));
  
  // Cleanup logic: Wipe out stale foreign trips stored in the live cloud DB
  for (const tripDoc of tripsSnapshot.docs) {
    const data = tripDoc.data();
    if (data.name && (data.name.includes("Japan") || data.name.includes("Euro"))) {
       console.log(`Pruning stale foreign trip: ${data.name}`);
       await deleteDoc(doc(db, "trips", tripDoc.id));
    }
  }

  // Re-fetch or check remaining to decide if we should seed fresh
  const activeSnapshot = await getDocs(collection(db, "trips"));
  
  // If any valid trips remain (like Uttarakhand), skip re-seeding
  const validTrips = activeSnapshot.docs.filter((d: any) => d.data().name && !d.data().name.includes("Japan") && !d.data().name.includes("Euro"));
  
  if (validTrips.length > 0) {
    console.log("Active valid trips found, skipping regeneration.");
    return;
  }

  console.log("Seeding dummy data to Firebase...");

  // Add dummy trips
  const tripRef1 = await addDoc(collection(db, "trips"), {
    name: "Uttarakhand Gateway 2026",
    dates: "Dec 15 - Dec 22",
    destinationCount: 3,
    status: "upcoming",
    coverPhoto: "https://images.unsplash.com/photo-1626621340025-73c76b1c3b3b?auto=format&fit=crop&w=800&q=80",
    userId: "mock-user-id"
  });

  const tripRef2 = await addDoc(collection(db, "trips"), {
    name: "Escape to Mussoorie",
    dates: "Jan 05 - Jan 09",
    destinationCount: 1,
    status: "planning",
    coverPhoto: "https://images.unsplash.com/photo-1586163240128-0213c8a2e594?auto=format&fit=crop&w=800&q=80",
    userId: "mock-user-id"
  });

  // Add stops for trip 1
  const stopRef1 = await addDoc(collection(db, "stops"), {
    tripId: tripRef1.id,
    city: "Dehradun",
    country: "India",
    dates: "Dec 15 - Dec 18",
    order: 1
  });

  const stopRef2 = await addDoc(collection(db, "stops"), {
    tripId: tripRef1.id,
    city: "Rishikesh",
    country: "India",
    dates: "Dec 18 - Dec 22",
    order: 2
  });

  // Add activities for stop 1 (Dehradun)
  await addDoc(collection(db, "activities"), {
    stopId: stopRef1.id,
    name: "Robber's Cave Exploration",
    type: "Adventure",
    duration: "2 hrs",
    cost: "₹50"
  });

  await addDoc(collection(db, "activities"), {
    stopId: stopRef1.id,
    name: "Sahastradhara Bath",
    type: "Nature",
    duration: "3 hrs",
    cost: "₹20"
  });

  await addDoc(collection(db, "activities"), {
    stopId: stopRef1.id,
    name: "Mindrolling Monastery Visit",
    type: "Culture",
    duration: "2 hrs",
    cost: "Free"
  });

  console.log("Seeding complete!");
}
