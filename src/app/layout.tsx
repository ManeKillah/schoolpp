import type {Metadata, Viewport} from "next";

import {Rubik} from "next/font/google";

import "./globals.css";
import Head from "next/head";
import Script from "next/script";

import {ThemeProvider} from "@/shared/components/theme/provider";
import SessionProvider from "@/modules/auth/components/provider";
import {Toaster} from "@/shared/components/ui/sonner";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Schoolpp admin",
  description: "Manage app",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  return (
    <html lang="es" translate="no">
      {/* <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
        />
      </Head> */}
      <body className={rubik.className}>
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
      />
    </html>
  );
}
