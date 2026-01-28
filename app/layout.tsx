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
      <body className={`${inter.variable} font-sans antialiased bg-[#02040a] text-slate-100 selection:bg-blue-500/30`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-transparent relative custom-scrollbar">
            {/* Ambient Background Effects - Deep Frosted Theme */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-[#02040a]">
              {/* Primary Mesh Gradients */}
              <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-indigo-600/10 blur-[160px] rounded-full animate-pulse" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[1200px] h-[1200px] bg-blue-600/5 blur-[160px] rounded-full opacity-50" />
              <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full" />

              {/* Floating Highlight Particles */}
              <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-blue-400/10 blur-[60px] rounded-full animate-bounce" style={{ animationDuration: '10s' }} />
              <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-purple-400/10 blur-[80px] rounded-full animate-pulse" style={{ animationDuration: '15s' }} />

              {/* Noise Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="relative z-10 px-4 md:px-0">
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

