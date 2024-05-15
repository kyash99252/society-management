import React from "react";
import { useUser } from "../../useUser"; // import the useUser hook

const UserDashboard = () => {
  const userContext = useUser(); // use the hook to access the context

  return (
    <div>
      <h1>User Dashboard</h1>
      {userContext &&
      userContext.userData &&
      userContext.userData.residentID ? (
        <p>Resident ID: {userContext.userData.residentID}</p>
      ) : (
        <p>No resident ID available.</p>
      )}
    </div>
  );
};

export default UserDashboard;
