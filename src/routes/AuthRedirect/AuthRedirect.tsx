import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

export const AuthRedirect = () => {
  const { isAuthenticated, role, /* adicione isLoading se expuser no context */ } = useAuth();

  // Se quiser, pode expor isLoading no context também. 
  // if (isLoading) {
  //    return <p>Carregando...</p>;
  // }

  if (isAuthenticated) {
    return role === "patient"
      ? <Navigate to="/paciente/home" />
      : <Navigate to="/admin/home" />;
  }

  return <Navigate to="/login" />;
};
