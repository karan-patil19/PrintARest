// Import necessary modules from Firebase
'use client'

import Image from "next/image";
import 'tailwindcss/tailwind.css';
// Import necessary modules from Firebase
// Import necessary modules from Firebase
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase.js"; // Adjust the path based on your file structure

// Other imports...


// Import necessary icons
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { useRouter } from 'next/router';

// Define the Home component
export default function Home() {
  // Initialize useRouter
  const router = useRouter();

  // Define a function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    // Create a new GoogleAuthProvider instance
    const provider = new GoogleAuthProvider();
    try {
      // Sign in with Google using signInWithPopup method
      const result = await signInWithPopup(auth, provider);
      // Check if user information is available in the result
      if (result.user) {
        // Check if the user's email ends with "paruluniversity.ac.in"
        if (result.user.email && result.user.email.endsWith("paruluniversity.ac.in")) {
          // Handle successful sign-in
          console.log("Signed in successfully!", result.user);
          // Navigate to the next page
          router.push('./dashboard'); // Replace '/nextPage' with the path to your next page
        } else {
          // If the email doesn't match the allowed domain, sign the user out
          await auth.signOut();
          // Display an alert message indicating unauthorized access
          alert("Please Login Your College Email Id.");
        }
      } else {
        // Handle case where user information is not available in the result
        console.error("User information not found in the result.");
      }
    } catch (error) {
      // Handle sign-in errors
      console.error("Error signing in:", error);
    }
  };

  // Function to handle manual login
  const handleLogin = async () => {
    const emailInput = document.querySelector<HTMLInputElement>('input[name="email"]');
    const passwordInput = document.querySelector<HTMLInputElement>('input[name="password"]');
    const email = emailInput?.value || '';
    const password = passwordInput?.value || '';

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user?.email || '';

      // Check if the user's email ends with "paruluniversity.ac.in"
      if (userEmail.endsWith("paruluniversity.ac.in")) {
        console.log("User email:", userEmail);

        router.push('./dashboard');
      } else {
        await auth.signOut();
        alert("Please login with your college email ID (ending with @paruluniversity.ac.in).");
      }
    } catch (error) {
      // Handle sign-in errors
      console.error("Error signing in:", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  // Return the JSX content
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2x shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5" >
          <div className="text-left  font-bold">
            <span className="text-pink-500">Print</span>Arest
          </div>
          <h2 className="text-3xl font-bold mb-2 pt-8">Login!</h2>
          <div className="border-2 w-10 border-pink-500 inline-block mb-2"></div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-64 p-2  flex items-center mb-5">
              <FaRegEnvelope className="text-gray-400 "/>
              <input type="email" name="email" placeholder="Email" className="bg-gray-100 outline-none flex-1" />
            </div>
          </div>
          <div className="flex flex-col items-center mb-5">
            <div className="bg-gray-100 w-64 p-2  flex items-center">
              <MdLockOutline className="text-gray-400  "/>
              <input type="password" name="password" placeholder="Password" className="bg-gray-100 outline-none flex-1" />
            </div>
          </div>
          {/* Login button */}
          <button onClick={handleLogin} className="bg-gradient-to-b from-pink-400 to-pink-600 w-80 rounded-full hover:bg-white hover:text-white px-12 py-2 inline-block">Login</button>
          <div className="py-10">or</div>
          {/* Add a button to trigger Google Sign-In */}
          <button onClick={handleGoogleSignIn} className="bg-gradient-to-b from-pink-400 to-pink-600 w-80 rounded-full hover:bg-white hover:text-white px-12 py-2 inline-block">Login With Google</button>
        </div>
        <div className="w-2/5 bg-gradient-to-b from-pink-400 to-pink-600 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
          <h2 className="text-3xl font-bold mb-2">Hello EveryOne!</h2>
          <div className="border-2 w-10  border-white inline-block mb-2"></div>
          <p className="mb-10">
            Welcome to PrinARest, Let us Print The Rest
          </p>
        </div>
      </div>
    </main>
  );
}
