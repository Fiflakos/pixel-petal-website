
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requireAdmin = false 
}) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && requireAdmin && !isAdmin && user) {
      // User is logged in but is not an admin
      toast({
        title: "Brak uprawnień",
        description: "Nie masz uprawnień administratora, aby zobaczyć tę stronę.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [isAdmin, loading, navigate, requireAdmin, user, toast]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect to home if admin is required but user is not an admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
