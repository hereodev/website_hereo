"use client";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
    const handleLogout = () => {
        console.log("Logout button clicked");
        // Calling the signOut function to log the user out
        signOut({
          callbackUrl: "/", // Redirects user to this URL after signout (optional)
        });
        console.log("User has been logged out");
      };
    
    return (
        <button className="btn btn-error" onClick={() => handleLogout()}>
        {/* Button for logging out */}
          Disconnect
        </button>

    )
}