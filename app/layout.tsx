import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { StrategicAssistant } from "@/components/strategic-assistant";
import { GlobalLoader } from "@/components/global-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OmniMind - Campaign Architect",
  description: "AI-powered media strategy co-pilot for programmatic advertising",
  icons: {
    icon: "/omnimind-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#0F111A] text-slate-100`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-[#0F111A] relative">
            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-900/10 blur-[120px] rounded-full" />
            </div>
            <div className="relative z-10">
              {children}
            </div>
          </main>
          <StrategicAssistant />
          <GlobalLoader />
        </div>
      </body>
    </html>
  );
}

