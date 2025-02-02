import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useAuth } from "home/src/hooks/auth/useAuth";
import { LoginFormInputs } from "home/src/types/types";
import { loginSchema } from "home/src/utils/schema/loginSchema";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const LoginForm: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    login(data.username, data.password);
  };

  if (isAuthenticated) {
    return (
      <Card className="max-w-md mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold text-green-600">Welcome!</h2>
        <p className="text-gray-600">You are now logged in.</p>
        <Link href="/" className="text-green-600">Go to Dashboard</Link>
      </Card>
    );
  }

  return (
    <Card className="w-[80%] md:max-w-md mx-auto mt-10 p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="username" className="text-gray-700">
            Username
          </Label>
          <TextInput
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register("username")}
            color={errors.username ? "failure" : "gray"}
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700">
            Password
          </Label>
          <TextInput
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            color={errors.password ? "failure" : "gray"}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginForm;
