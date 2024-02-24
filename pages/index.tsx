// Import necessary modules from Firebase
'use client'


import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase.js"; // Adjust the path based on your file structure

// Import necessary icons
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

// Import useRouter from Next.js
import { useRouter } from 'next/router';

// Define the Home component
export default function Home() {
  // Initialize useRouter
  const router = useRouter();

  // Define a function to handle Google Sign-In
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


  // Return the JSX content
  return (
    <main className="flex min-h-screen flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="bg-white rounded-2x shadow-2xl flex w-2/3 max-w-4xl">
        <div className="w-3/5 p-5" >
          <div className="text-left  font-bold">
            <span className="text-green-500">Print</span>Arest
          </div>
          <h2 className="text-3xl font-bold mb-2 pt-8">Login!</h2>
          <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
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
          <div className="py-10">or</div>
          {/* Add a button to trigger Google Sign-In */}
          <button onClick={handleGoogleSignIn} className="bg-green-400  w-80 rounded-full hover:bg-white hover:text-green-400 px-12 py-2 inline-block">Login With Google</button>
        </div>
        <div className="w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
          <h2 className="text-3xl font-bold mb-2">Hello EveryOne!</h2>
          <div className="border-2 w-10  border-white inline-block mb-2"></div>
          <p className="mb-10">
            Fill up personal information and start journey with us
          </p>
        </div>
      </div>
    </main>
  );
}
