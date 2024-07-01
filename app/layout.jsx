import "./globals.css";
import { Play } from "next/font/google";
import { AuthProvider } from "./Providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Tires Management App",
  description: "App to manage tires and other resources",
};

const play = Play({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className={play.className}>
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
