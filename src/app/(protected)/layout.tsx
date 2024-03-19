import {getServerSession} from "next-auth";
import React from "react";
import {redirect} from "next/navigation";
import {headers} from "next/headers";

import {authOptions} from "@/shared/lib/auth";
import {ScrollArea} from "@/shared/components/ui/scroll-area";
import {Header} from "@/shared/components/layout/header";
import {LayoutProvider} from "@/shared/components/layout/provider";
import {Footer} from "@/shared/components/layout/footer";
import Aside from "@/shared/components/layout/aside";

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);

  const headersList = headers();

  if (!session?.user) {
    const pathname = headersList.get("x-pathname")!;
    const searchParams = new URLSearchParams();

    searchParams.set("redirectUrl", encodeURI(pathname));

    redirect(`/sign-in?${searchParams.toString()}`);
  }

  return (
    <LayoutProvider>
      <Header />
      <Aside />
      <ScrollArea className="main size-full">
        <main>{children}</main>
        <Footer />
      </ScrollArea>
    </LayoutProvider>
  );
}
