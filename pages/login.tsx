import LoginForm from "home/src/components/login/LoginForm";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="h-[70vh] flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
