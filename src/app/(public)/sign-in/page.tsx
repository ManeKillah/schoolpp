import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import LoginForm from "@/modules/auth/components/LoginForm";
// import { useState } from "react";

export default function SignInPage() {
  // const [rememberMe, setRememberMe] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <img alt="Logo" src="/schoolpp_logo.png" className="w-32 md:w-48 mt-8 mb-4" /> {/* Adjust logo size */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Bienvenido</CardTitle>
          <p className="text-sm text-center text-gray-500">Ingrese los datos para continuar</p>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="flex items-center justify-between mt-4">
            <label htmlFor="rememberMe" className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="mr-2"
                // checked={rememberMe}
                // onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recordar por 30 días</span>
            </label>
            <a href="/forgot-password" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
