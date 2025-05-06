
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Welcome to Journease
        </h1>
        <p className="text-lg text-gray-500">
          Your personal journal for documenting life's moments
        </p>
        <div className="flex flex-col gap-4 pt-6">
          <Button className="w-full" size="lg" onClick={() => navigate("/login")}>
            Get Started
          </Button>
          {isAuthenticated && (
            <Button 
              variant="outline" 
              className="w-full" 
              size="lg" 
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
