import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import XeroxShopBooking from './XeroxShopBooking'; // Import the XeroxShopBooking component
import { auth } from './firebase'; // Import the Firebase auth object

const Dashboard = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');

  // Example of checking if the user is authenticated
  useEffect(() => {
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // If user is authenticated, set the display name
        setDisplayName(user.displayName || ''); // Set display name to empty string if not available
      } else {
        // If user is not authenticated, redirect to login
        router.push('/login');
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, [router]); // Add router to the dependency array

  return (
    <div>
      <header className="bg-blue-900 text-white text-center py-4">
        <h1 className="text-2xl font-bold"> {displayName}!,   Welcome To Print A Rest</h1>
      </header>
      
  


    


      
      {/* Render the XeroxShopBooking component */}
      <XeroxShopBooking />
    </div>
  );
};

export default Dashboard;
