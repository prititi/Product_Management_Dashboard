import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/auth/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, setRedirectUrl } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      // Store the current URL in context for redirect after login
      setRedirectUrl(router.asPath);
      router.push("/login");
    }
  }, [isAuthenticated, router, setRedirectUrl]);

  if (!isAuthenticated) {
    return null; // Prevent rendering of protected page
  }

  return <>{children}</>;
};

export default ProtectedRoute;
