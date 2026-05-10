import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export async function fixBrokenTripImages() {
  console.log("Fixing broken trip images...");
  const tripsSnapshot = await getDocs(collection(db, "trips"));
  
  for (const tripDoc of tripsSnapshot.docs) {
    const data = tripDoc.data();
    const name = data.name.toLowerCase();
    let newPhoto = null;

    if (name.includes("mussoorie")) {
      newPhoto = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80";
    } else if (name.includes("dehradun") || name.includes("uttarakhand")) {
      newPhoto = "https://images.unsplash.com/photo-1595928642581-f50f4f3453a5?auto=format&fit=crop&w=800&q=80";
    } else if (name.includes("bromo")) {
      newPhoto = "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&w=800&q=80";
    }

    if (newPhoto) {
      await updateDoc(doc(db, "trips", tripDoc.id), {
        coverPhoto: newPhoto
      });
      console.log(`Updated trip: ${data.name}`);
    }
  }
  console.log("Fix complete!");
}
