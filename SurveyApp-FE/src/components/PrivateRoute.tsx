import { userAuth } from "@/context/AuthContext";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const {session, isLoading} = userAuth();
      // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Redirect to signup if not authenticated and loading is complete
  if (!session) {
    return <Navigate to="/signup" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default PrivateRoute;