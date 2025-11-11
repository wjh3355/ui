import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { siteConfig } from "@/lib/config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import ProgressWrapper from "@/providers/ProgressWrapper";
import { ThemeProvider } from "@/providers/ThemeProvider";
import FaviconWrapper from "@/providers/FaviconWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ["8StarLabs", "UI", "shadcn", "Components", "transport"],
  authors: [
    {
      name: "8StarLabs",
      url: "https://8starlabs.com"
    }
  ],
  creator: "8StarLabs"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FaviconWrapper />
          <SiteHeader />
          <ProgressWrapper>{children}</ProgressWrapper>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
