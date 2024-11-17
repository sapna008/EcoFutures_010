// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDftzzt0Jl9ohCs823epppcGfHdkD0yKS4",
  authDomain: "authentication-38e19.firebaseapp.com",
  projectId: "authentication-38e19",
  storageBucket: "authentication-38e19.firebasestorage.app",
  messagingSenderId: "214165391704",
  appId: "1:214165391704:web:02cd44599fea63d4aa3d2d",
  measurementId: "G-P02YNZ5MPZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

// const signUp = document.getElementById("submitSignUp");
// signUp.addEventListener("click", (event) => {
//   event.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   const fullName = document.getElementById("full-name").value;
//   const mobile = document.getElementById("mobile").value;

//   const auth = getAuth();
//   const db = getFirestore();

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       const userData = {
//         email: email,
//         fullName: fullName,
//         mobile: mobile,
//       };
//       showMessage("Account Created Successfully", "signUpMessage");
//       const docRef = doc(db, "users", user.uid);
//       setDoc(docRef, userData)
//         .then(() => {
//           window.location.href = "login.html";
//         })
//         .catch((error) => {
//           console.error("Error Writing document", error);
//         });
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       if (errorCode == "auth/email-already-in-use") {
//         showMessage("Email Address ALready Exists !!! ", "signUpMessage");
//       } else {
//         showMessage("Unable to Create User", "signUpMessage");
//       }
//     });
// });

// const signIn = document.getElementById("signInn");
// signIn.addEventListener("click", (event) => {
//   event.preventDefault();
//   const email = document.getElementById("emailLogin").value;
//   const password = document.getElementById("passwordLogin").value;
//   const auth = getAuth();

//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       showMessage("login is successful", "signInMessage");
//       const user = userCredential.user;
//       localStorage.setItem("loggedInUserId", user.uid);
//       window.location.href = "homepage.html";
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       if (errorCode === "auth/invalid-credential") {
//         showMessage("Incorrect Email or Password", "signInMessage");
//       } else {
//         showMessage("Account does not Exist", "signInMessage");
//       }
//     });
// });

document.addEventListener("DOMContentLoaded", () => {
  const signUp = document.getElementById("submitSignUp");
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const fullName = document.getElementById("full-name").value;
      const mobile = document.getElementById("mobile").value;

      const auth = getAuth();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: email,
            fullName: fullName,
            mobile: mobile,
          };
          showMessage("Account Created Successfully", "signUpMessage");
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = "login.html";
            })
            .catch((error) => {
              console.error("Error Writing document", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email Address ALready Exists !!! ", "signUpMessage");
          } else {
            showMessage("Unable to Create User", "signUpMessage");
          }
        });
    });
  }

  const signIn = document.getElementById("signIn");
  if (signIn) {
    signIn.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("emailLogin").value;
      const password = document.getElementById("passwordLogin").value;
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          showMessage("login is successful", "signInMessage");
          const user = userCredential.user;
          localStorage.setItem("loggedInUserId", user.uid);
          window.location.href = "../../index.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-credential") {
            showMessage("Incorrect Email or Password", "signInMessage");
          } else {
            showMessage("Account does not Exist", "signInMessage");
          }
        });
    });
  }
});

// Google Sign-In
document.getElementById("googleSignInBtn").addEventListener("click", () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Google Sign-In successful", user);
      showMessage("Google Sign-In Successful", "signInMessage");
      window.location.href = "../../index.html";
    })
    .catch((error) => {
      console.error("Google Sign-In Error:", error);
      showMessage("Google Sign-In Failed", "signInMessage");
    });
});

// OTP Login: Show OTP Modal

document.getElementById("otpLoginBtn").addEventListener("click", () => {
  document.getElementById("otpModal").style.display = "block";
});

document.getElementById("sendOtpBtn").addEventListener("click", () => {
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Initialize RecaptchaVerifier
  const recaptchaVerifier = new RecaptchaVerifier(
    "sendOtpBtn", // ID of the container
    {
      size: "invisible", // Invisible Recaptcha
      callback: () => {
        console.log("Recaptcha resolved successfully");
      },
    },
    auth
  );

  // Send OTP
  signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult; // Save globally for OTP verification
      document.getElementById("otpVerification").style.display = "block";
      alert("OTP sent to " + phoneNumber);
    })
    .catch((error) => {
      console.error("Error Sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    });
});

document.getElementById("verifyOtpBtn").addEventListener("click", () => {
  const otpCode = document.getElementById("otpCode").value;

  window.confirmationResult
    .confirm(otpCode)
    .then((result) => {
      const user = result.user;
      console.log("Phone login successful:", user);
      alert("Phone Login Successful");
      window.location.href = "../../index.html";
    })
    .catch((error) => {
      console.error("Error Verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    });
});
