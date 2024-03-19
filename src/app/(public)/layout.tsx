import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

import {authOptions} from "@/shared/lib/auth";

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="container relative flex h-screen items-center justify-center" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/fondo.jpg')", backgroundSize: "cover" }}>{children}</main>
  );
}
