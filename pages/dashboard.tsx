import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  // Example of checking if the user is authenticated
  useEffect(() => {
    // Check if the user is authenticated, if not, redirect to the login page
    const isAuthenticated = true; // Replace with your authentication logic
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]); // Add router to the dependency array

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>This is the dashboard content.</p>
    </div>
  );
};

export default Dashboard;
