import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { TopNav } from "@/components/navbar/TopNav";
import { auth } from "@/auth";

// Here we define our google font to use
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NextMatch",
  description:
    "Generated by create next app; this appears under the site name in Google when searched, and in social share",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id ?? null;
  const profileComplete = session?.user.profileComplete;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Providers userId={userId} profileComplete={profileComplete}>
          <TopNav />
          {/* Note: I'm using vertical-center custom class here, he used it in the LoginPage component */}
          {/* I think it's a good solution provided that we use our own scrollbar in pages */}
          <main className={"container mx-auto vertical-center"}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
