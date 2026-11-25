import Header from "./components/Header";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joshua Bautista | Web Developer",
  description:
    "HubSpot CMS and WordPress developer specializing in HubL modules, HubDB-driven content, and clean, responsive front-end work.",
  metadataBase: new URL("https://bauworks.space"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon-48.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on load. Default: dark. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})()`,
          }}
        />
      </head>
      <body id="top" className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
