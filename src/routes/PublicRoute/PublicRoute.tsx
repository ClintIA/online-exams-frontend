import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { Spinner } from "@/components/ui/Spinner";

interface PublicRouteProps {
    children: React.ReactNode;
}


export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { isAuthenticated, role, isLoading } = useAuth();
  
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isAuthenticated) {
      if (role === "patient") {
        return <Navigate to="/paciente/home" replace />;
      } else if (
        role === "default" ||
        role === "admin" ||
        role === "doctor" ||
        role === "marketing"
      ) {
        return <Navigate to="/admin/home" replace />;
      }
    }
  
    return <>{children}</>;
  };
  

