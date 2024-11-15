import { db } from './apiConfig';  // Importing the initialized database
import { get, set, ref } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js';

function generateUUID() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function sanitizeObjectKeys(obj) {
  const sanitizedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Replace invalid characters (e.g., ".", "#", "$", "/", "[", "]") with underscores
      const sanitizedKey = key.replace(/[.#$/[\]]/g, "_");
      sanitizedObj[sanitizedKey] = obj[key];
    }
  }
  return sanitizedObj;
}

export function addToWishlist( productObject) {
  let correctData = sanitizeObjectKeys(productObject)
    let userID = generateUUID(); // Generate a new UUID if not provided
    console.log("Generated new UUID for wishlist:", userID);
  // Use Firebase set to store the user data
  set(ref(db, 'product/' + userID), correctData)
    .then(() => {
      console.log("Object written successfully for user ID:", userID);
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

function getWishList(userID) {
  const userRef = ref(db, 'product/' + userID);
  // Fetch data from Firebase using get
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("User data:", snapshot.val());
      } else {
        console.log("No data available for user ID:", userID);
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}

function getAllUsers() {
  const usersRef = ref(db, 'users'); // Reference to all users
  // Fetch all users' data
  get(usersRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("All users data:", snapshot.val());
      } else {
        console.log("No data available.");
      }
    })
    .catch((error) => {
      console.error("Error reading data:", error);
    });
}
