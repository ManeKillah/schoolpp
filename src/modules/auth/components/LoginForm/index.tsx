"use client";

import {AlertCircle} from "lucide-react";

import useSignIn from "@/modules/auth/lib/useSignIn";
import {Alert, AlertDescription, AlertTitle} from "@/shared/components/ui/alert";
import {Button} from "@/shared/components/ui/button";
import {Input} from "@/shared/components/ui/input";
import Spinner from "@/shared/components/ui/spinner";

export default function LoginForm() {
  const {loading, errors, register, handleSubmit} = useSignIn();

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {errors.root ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      ) : null}
      <div>
        <Input {...register("email")} placeholder="Email" type="email" />
        {errors.email ? <span className="text-xs text-red-400">{errors.email.message}</span> : null}
      </div>
      <div>
        <Input {...register("password")} placeholder="Contraseña" type="password" />
        {errors.password ? (
          <span className="text-xs text-red-400">{errors.password.message}</span>
        ) : null}
      </div>
      <Button disabled={loading} type="submit" variant="default">
        {loading ? <Spinner /> : "Ingresar"}
      </Button>
    </form>
  );
}
