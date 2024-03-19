import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

import {authOptions} from "@/shared/lib/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/inicio/dashboard");
  } else {
    redirect("/sign-in");
  }
}
